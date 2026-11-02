---
title: "What does my phone know about my location?"
pubDatetime: 2026-11-02
description: "A snowstorm cut off cellular network in a Himalayan town. Perfect conditions to find out where my Android phone really gets its location from."
tags: ["gps", "android", "gnss", "geolocation", "location-services"]
series: "Positioning & Navigation"
ogImage: ../../assets/images/09_gnss/09_cover_1600x840.png
slug: android-location-without-network
---

Some time ago I was pondering that question. 

But I never imagined I'd get such a great opportunity to test it as I did last September.

Hear me out.

## Himalayan Weather Outage 

24th September 2026 brought heavy rain and snowfall in the Nepali Himalayas ([and took a horrific toll across the whole of Nepal](https://www.nationpress.com/international/nepal-floods-kill-27-since-sep-24-power-supply-hit)). For trekkers on the Annapurna Circuit, who made it to the mountain town of Manang (3540 m amsl), it meant staying put as the trail above the town was closed due to the risk of avalanches. The town lost power and cellular coverage. 

![Manang covered in snow](/images/09_gnss/IMG20260925100113.jpg)

*Figure 1. Snow, rain and hail over Manang, Annapurna Circuit, Himalayas, Nepal. 24th September 2026.*

---

As bad as it may sound, the lack of cellular network created rare and valuable testing conditions for my "what does my phone know about my location" question. 

Why?

Because we usually just turn on location services and a location marker magically appears in a map app. But we don't really have much insight into sources and how much each source matters in the final location marker placement. 

It is rare to have no cellular network in today's world. Switching to airplane mode simulates this scenario, but you still have to trust the phone's software not to use cellular data under the hood. But if there is no service at all, trust is irrelevant. No signal means your phone can't cheat (not much, at least; it will still remember your previous location). 

## Case 1: No cellular network 

On 27th September, after three days of biblical weather, the sun finally came out. And so did I. 

![Manang buildings and mountains in snow in the background](/images/09_gnss/IMG20260927131600.jpg)

*Figure 2. Manang on 27th September 2026.*

---

The cellular network was still down, but the offline maps app on my phone seemed to be able to establish my location: I was indeed on this path and entering the area that looked like a forested pasture (the green area in the map in Fig. 3). 

![Location on mapy.com with offline maps](/images/09_gnss/offline_maps.jpg)

*Figure 3. My location on mapy.com with offline maps.* 

---

Now it's time to find out how my device determines this location. 

### GnssLogger

Since I'm on Android, I'm making use of [**GnssLogger**](https://play.google.com/store/apps/details?id=com.google.android.apps.location.gps.gnsslogger).

The app focuses mainly on [GNSS](https://www.earthdata.nasa.gov/data/space-geodesy-techniques/gnss) (Global Navigation Satellite System; GPS is one type of GNSS), as it paints satellites in the sky above and logs the data received from these satellites. 

The Map pane, however, makes use of the three native Android location providers to position location markers on the map:

* **GPS Provider** which determines location using GNSS satellites, 
* **Network Location Provider (NLP)** which determines location based on nearby cell towers and WiFi access points,
* **[Fused Location Provider (FLP)](https://developers.google.com/location-context/fused-location-provider)** which combines different signals, such as GPS and WiFi, to provide the location information. It is also the recommended location provider for Android apps. 

![gnsslogger](/images/09_gnss/IMG_20261011_214201.jpg)

*Figure 4. GnssLogger location providers legend.*

---

The fourth marker is **Weighted Least Squares (WLS)**. It comes from solving an optimization problem of finding the location given 4+ raw GNSS measurements. 

Let's get back to the experiment and explore the output of GnssLogger. 

![GnssLogger makes use of Google Maps](/images/09_gnss/networkoff.jpg)

*Figure 5. GPS and FLP markers in the Map pane in GnssLogger are shown when no cellular network is available.* 

---

GnssLogger uses Google Maps in the Map pane, which doesn't work offline, so no topographic information is shown in Fig. 5. I couldn't easily retrieve the coordinates either (let me know if you know where to find them in the app). I assumed that my location in [mapy.com](https://mapy.com/en) app comes from FLP, since it's Android's recommended location provider. So the location marker in mapy.com app (Fig. 3) and the FLP marker in GnssLogger (Fig. 5) should point to the same place.

In GnssLogger I could see only two markers: the dark green GPS and the blue FLP. Their presence was expected, so was the lack of NLP, as there was no cellular network connectivity. But I also expected to see the WLS marker. 

At least 4 satellites were visible in the sky, so the calculations should be possible... So what is going on?

![actual status 3](/images/09_gnss/networkoff_gpssky.jpg)

*Figure 6. Significantly more than 4 satellites are visible in the sky, so why no WLS?*

---

I found the reason once I reviewed the code. It turns out that the code relies on NLP to give a rough location. This location is then used to query Google's SUPL server (`supl.google.com`) over the internet to fetch satellite [ephemerides](https://en.wikipedia.org/wiki/Ephemeris). An ephemeris is a set of orbital parameters that let a receiver calculate the satellite's precise 3D position (and clock error) at any given time. The app doesn't _need_ to download this data from the server, as satellites broadcast it themselves, but downloading it makes everything much faster. But [the code](https://github.com/google/gps-measurement-tools/blob/master/GNSSLogger/pseudorange/src/main/java/com/google/location/lbs/gnss/gps/pseudorange/PseudorangePositionVelocityFromRealTimeEvents.java#L97-L102) is clear: unless ephemerides are fetched from the server, WLS just gives up on the job.

One caveat: the published source is GnssLogger 2.0.0.0, while my phone runs 3.1.1.3, whose source isn't public. I can't be sure the newer version works the same way, but the app behaviour was consistent with the old code. Keep that in mind, I'll come back to it. 

This part of the experiment leaves one open question though: **if the only location signal is the GPS, why don't GPS and FLP markers align?** 

If I were to approach implementing FLP, I'd probably take the results from available location providers, weighted them, and returned the weighted location as my own. Of the two providers, NLP and GPS, only GPS was available, so it would be given the weight of 1. So my FLP would return exactly the same location as GPS. 

If FLP does indeed use the GPS location provider's inputs, then it must be adding more data to the mix: previous location information and/or sensor data (accelerometer, gyroscope, barometer, etc). 

If, however, it does not use the GPS location provider's inputs, but instead does its own GNSS calculations and does them differently, then no such conclusion can be made. 

Without access to the FLP source code (it's not open) and with my limited testing toolkit, I cannot pinpoint the exact component that made the difference. Nevertheless, we learned that FLP does its calculations differently and possibly uses more than GNSS data.

### Case 1 Summary

**Status**: 
* No network connection
* No mobile data
* No WiFi

**Expectation**: 
* Available: GPS, FLP, WLS
* Not available: NLP

**Reality**:
* Available: GPS, FLP
* Not available: NLP, WLS

## Case 2: Cellular network on but no data

I went back to testing on 2nd October. Cellular network had been restored by then, though with no mobile data — only phone calls and old-fashioned text messages were passing through. 

I expected to see all the markers on the map, especially the NLP marker, since the network was back. Much to my astonishment, it wasn't there.

![gnsslogger map with visible markers for GPS and FLP](/images/09_gnss/networkon_dataoff.jpg)

*Figure 7. GnssLogger map when cellular network is available but no mobile data. Visible markers for GPS and FLP, but neither NLP nor WLS.*

---

I looked into the code again. GnssLogger treats NLP as a black box ([here](https://github.com/google/gps-measurement-tools/blob/b204a4dd0eee7553e7458e572a83a8b8eb01a9b4/GNSSLogger/app/src/main/java/com/google/android/apps/location/gps/gnsslogger/MeasurementProvider.java#L273) and [here](https://github.com/google/gps-measurement-tools/blob/b204a4dd0eee7553e7458e572a83a8b8eb01a9b4/GNSSLogger/app/src/main/java/com/google/android/apps/location/gps/gnsslogger/MeasurementProvider.java#L331)). My hypothesis is that NLP requires mobile data to function. This is partially supported by the "Operation of this provider may require a data connection" statement in the [Android documentation](https://developer.android.com/reference/android/location/LocationManager#NETWORK_PROVIDER).

The WLS marker also didn't show up. But, given that NLP didn't show up, the absence of WLS was just consistent with what I observed in Case 1. 

### Case 2 Summary

**Status**: 
* Network connection available
* No mobile data service available

**Expectation**: 
* Available: NLP, GPS, FLP, WLS

**Reality**:
* Available: GPS, FLP
* Not available: NLP, WLS

## Case 3: Cellular network + WiFi

So what would you do on a day like that in Manang with no data connectivity? 

We went to the police station. 

Before you jump to the conclusion that the absence of WiFi is considered a crime: we just went to kindly ask whether we could use their WiFi (local officials had their own connectivity).

The screenshot below demonstrates the outcome of this test.

![gnsslogger map with all four markers](/images/09_gnss/networkon_wifion.jpg)


*Figure 8. GnssLogger map when cellular network and WiFi are available. All four markers (NLP - purple, GPS - dark green, FLP - blue, WLS - light green) are present. My location is marked with a red cross.*

---

Now that Google Maps had worked and I could place myself with reference to the police station building, I could see that none of the markers were perfectly correct. 

The NLP marker (purple) shows the position that I couldn't attribute to any object (I refrained from taking photos at the police station). 

Now a curious one: GPS and WLS (dark green and light green markers) are close to each other, but not aligned. Why would these two differ? There are again a few possible answers to that:
* While WLS uses only raw measurements, the GPS chipset on the device typically uses a [Kalman filter](https://gnssmetrics.com/learn/mathematics/kalman-filter/). Kalman filter combines these new raw measurements with the prediction of where the system should be, which gives smoother estimates over time. 
* GPS location provider can use different satellites with different cadence than WLS.
* GPS chipset and/or GPS location provider can use sensor data. Since I wasn't moving, which was likely recognized from the sensor readings, there was no reason to move the marker. 

It could have been one of these reasons, it could have been all three. GPS location provider's source code is closed, which leaves us again in limbo.

There is one more observation I've made about the WLS marker. It keeps moving all the time! It is best viewed as a recording — the video below was recorded on a different occasion, but shows this jumping behaviour very well. 

<video controls playsinline preload="none"
         poster="/images/09_gnss/thumb.jpg"
         style="display:block; margin:0 auto; max-height:80vh; max-width:100%; height:auto;">
    <source src="/images/09_gnss/wls_errors.mp4" type="video/mp4">
</video> 

With every update (every second) a WLS location is calculated from scratch from the satellite data. It shows how important and challenging it is to stabilise location information enough to use it reliably in mobile apps. In the video, GPS estimates are quite smooth in time, which I'd attribute to the Kalman filter and potentially to additional sensor data. 

### Case 3 Summary

**Status**: 
* Network connection available
* No mobile data service available
* WiFi available

**Expectation**: 
* Available: NLP, GPS, FLP, WLS

**Reality**:
* Available: NLP, GPS, FLP, WLS

## Case 4: Back home, Location Accuracy off

Back home, that version caveat kept bugging me, so I ran one more test. 

Android has a setting called _Improve Location Accuracy_. Its description lists exactly what it uses:

> When Location Accuracy is on, information about **wireless signals, such as Wi-Fi access points, mobile network towers and GPS**, along with **device sensor data, such as accelerometer and gyroscope**, is used to estimate more accurate device location. 

Turning this setting off also switches off the NLP. 

![Phone screen split into Location Accuracy settings and GnssLogger](/images/09_gnss/case4.jpg)

*Figure 9. Location Accuracy settings screen along with GnssLogger.*

---

NLP disappeared, as expected. WLS, however, stayed. 
In the old GnssLogger code, WLS required two pieces of information to run: rough location from NLP and ephemerides from Google's SUPL server. In Cases 1 and 2, both NLP and WLS were absent. Now, in this last test, NLP is gone and cannot provide the rough location. Nevertheless, WLS works. 

My conclusion is that GnssLogger 3.1.1.3 no longer requires NLP's rough location. In Manang, the more likely culprit was the missing internet connection, making it impossible to download ephemerides from Google's SUPL server. 

### Case 4 Summary

**Status**: 
* Network connection available
* Mobile data service available
* WiFi off
* Improve Location Accuracy setting off

**Expectations**:
* Available: GPS, FLP
* Not available: NLP, WLS

**Reality**:
* Available: GPS, FLP, WLS
* Not available: NLP


## Conclusion

This story began with a weather outage in Manang that cut power and cellular service. As unfortunate as it was, I got an uncommon opportunity to test what my phone knows about my location. With no signal, the phone can't quietly use network data the way it might in airplane mode. 

I ran these four test cases:
* Case 1: no cellular network, no data, no WiFi
* Case 2: cellular network back, but no mobile data
* Case 3: cellular network plus WiFi 
* Case 4: cellular network plus mobile data, Improve Location Accuracy (LA) off

The results:

| Case | Network | Data / WiFi | LA | NLP | GPS | FLP | WLS |
|:----:|:-------:|:-----------:|:--:|:---:|:---:|:---:|:---:|
| 1 | ❌ | ❌ | ✅ | ❌ | ✅ | ✅ | ❌ |
| 2 | ✅ | ❌ | ✅ | ❌ | ✅ | ✅ | ❌ |
| 3 | ✅ | ✅ (WiFi) | ✅ | ✅ | ✅ | ✅ | ✅ |
| 4 | ✅ | ✅ (mobile data) | ❌ | ❌ | ✅ | ✅ | ✅ |


I learned a few things along the way.

1. GNSS works fully offline, but tools like GnssLogger's WLS still depend on internet connectivity (Case 1, 2 and 4). My investigation suggests that WLS won't be computed unless ephemerides can be downloaded from Google's SUPL server.
2. NLP apparently needs mobile data or WiFi. Case 2 demonstrated that cellular signal alone isn't enough.
3. When NLP is not available, FLP does not equal the GPS location. This difference was visible in Case 1, when no cellular network was available. Either FLP does not use GPS location provider's estimates or it adds more to the mix (sensors' data or previous location). However, FLP source code is not publicly available.
4. GPS location provider gives much smoother estimates than WLS. It could benefit from Kalman smoothing in GPS chipset or additional sensor data to stabilise the result. The strength of this smoothing was best seen in the video in Case 3.
5. GPS and WLS markers rarely align, which could be seen in Case 3. Apart from possible smoothing effect, GPS location provider can simply use different satellites for its measurements. 
6. NLP marker placement calls for a separate investigation.

When I went to Nepal I was expecting merely an amazing trekking experience on the Annapurna Circuit. This testing opportunity was the cherry on top. 

I hope you enjoyed this discovery process as much as I did. Till the next story!