---
layout: default
---

<div align="center">
	<h3>
	<a href="/index.html">bio</a> | <a href="/research.html"><b>research</b></a> | <a href="/impact.html">impact</a> | <a href="/teaching.html">teaching</a><br>
	</h3>
</div>
<div align="center">
	<h4>
	<a href="/research-aerial.html"><b>aerial photo</b></a> | <a href="/research-jmp.html">mapping poverty</a> | <a href="/research-covid19.html">COVID19</a> | <a href="/research-pollution.html">air pollution</a> | <a href="/research-rct.html">RCT</a>
	</h4>
</div>

----

__Mapping Historical Climate Migration With 1.6 Million Aerial Photographs__

([GitHub](https://github.com/luna983/stitch-aerial-photos))

In a centuries-old library at the University of Oxford, millions of aerial photographs taken in the final decades of the British Empire may help us prepare for a potential 21st century calamity: an exodus of people driven by climate change to places that are more livable — but politically inhospitable.

Our team is studying how climate change might set off mass migrations around the world, and looking back to history for inspiration. These century-old photos, some of which taken by the British Royal Air Force, are key to this analysis because they could reveal how populations responded to natural disasters in the past — specifically, a series of extreme droughts that plagued Africa, and hurricanes that wreaked havoc in the Caribbean islands. There were such little census or survey data back then, and the earliest record of satellite images started only in 1970s. Apart from these boxes and boxes of black-and-white photos, scholars trying to study historical mass migrations have almost nothing to work with; but now, with modern computer vision and machine learning techniques, we can paint a more complete picture of human settlement patterns and how they respond to extreme weather events.

One of the first challenges in working with historical aerial photos is that it is difficult to georeference them, or to assign the images to the geographical location that they cover. Unlike modern satellite imagery, historical images are not georeferenced at the time when they are collected, and the ways that experts record their locations can be pretty crude. Usually, they roughly outline the areas that the aerial photos cover by hand, and mark the image identifier numbers on them. As you can imagine, these hand-drawn maps tend to be inaccurate, and more importantly, georeferencing aerial photos solely based on hand-drawn maps is labor intensive and quickly becomes impossible as the number of aerial photos grows. Other commercially available softwares such as Photoshop and OpenCV succeeded in automatically stitching a small number of images (<100), but failed miserably when scaled up.

__Figure: An exmaple hand-drawn map marking the positions of the aerial photos.__

![sortie](/assets/data/research-aerial-stitch/sortie.jpg)
*Source: [National Collection of Aerial Photography, UK.](https://ncap.org.uk/sites/default/files/NCAP_ACIU_PLOT_64976-3.jpg)*

I developed an algorithm that utilizes information from these coarse hand-drawn maps and automatically positions aerial photos such that they are aligned with each other. The algorithm takes inspiration from both classic computer vision algorithms such as SURF and RANSAC, and machine learning concepts such as computational graph and gradient descent. See the figure below for a simple demonstration; more detailed descriptions and the source codes can be found [here](https://github.com/luna983/stitch-aerial-photos).

__Figure: The positions of four aerial photos are jointly optimized to form a coherent mosaic.__

<div id='research-aerial-stitch' class='canvas'>
<p id='research-aerial-stitch-text'></p>
<img src='/assets/data/research-aerial-stitch/test0.jpg' id='research-aerial-stitch-test0' class='canvas-img'>
<img src='/assets/data/research-aerial-stitch/test1.jpg' id='research-aerial-stitch-test1' class='canvas-img'>
<img src='/assets/data/research-aerial-stitch/test2.jpg' id='research-aerial-stitch-test2' class='canvas-img'>
<img src='/assets/data/research-aerial-stitch/test3.jpg' id='research-aerial-stitch-test3' class='canvas-img'>
</div>

Currently, our team is extracting historical building footprints and road networks from these mosaicked images, with state-of-the-art deep learning models such as DeepLabV3 and D-LinkNet. Through that, we are tracing the changes in human settlement patterns over time, and studying the causal effects of long-term climatic changes on the spatial distribution of population.

<script src="/assets/data/research-aerial-stitch/data.js"></script>
<script src="/assets/js/research-aerial-stitch.js"></script>
