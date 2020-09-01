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
	<a href="/research-aerial.html">aerial photo</a> | <a href="/research-jmp.html">mapping poverty</a> | <a href="/research-covid19.html">COVID19</a> | <a href="/research-pollution.html"><b>air pollution</b></a> | <a href="/research-rct.html">RCT</a>
	</h4>
</div>

----

__Information, Incentives and Air Quality: New Evidence from Machine Learning Predictions__

_joint with Minghao Qiu_

([__Slides__](https://github.com/luna983/air-quality-machine-learning/blob/master/docs/slides.pdf) &#124; [__Github__](https://github.com/luna983/air-quality-machine-learning))

In command-and-control regulations, information asymmetry between central regulators and local agents is often cited as a key issue leading to ineffective policies. We evaluate a policy in China, which built air quality monitoring stations and enforced automatic data reporting to the central government, effectively preventing data manipulations by local officials. Exploiting the staggered implementation of this policy across 367 cities, we examine the impacts of the policy on local air quality. However, before monitoring stations were set up and data were credibly reported, we cannot observe pre-treatment air quality data. To overcome this challenge, we leverage recent development in machine learning (specifically, extreme gradient boosting) and a rich set of satellite images from NASA and reconstruct a comprehensive air pollution dataset in China with almost 0.5 million observations spanning from 2005 to 2016. Our structural break estimates do not demonstrate significant program effects.

<div id='research-pollution-hist-nav' align="center">
<table>
  <tr>
    <td id='rpt' style='text-align: center; cursor: pointer;'>Gov't Reported</td>
    <td id='sat' style='text-align: center; opacity: 0.5; cursor: pointer;'>Remotely Sensed</td>
  </tr>
</table>
</div>
<div id='research-pollution-hist'></div>

<script src="/assets/js/research-pollution-hist.js"></script>
