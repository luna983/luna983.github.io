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

__Combatting the Manipulation of Air Pollution Data with Remote Sensing__


([Slides](https://github.com/luna983/air-quality-machine-learning/blob/master/docs/slides.pdf) \| [Manuscript](https://github.com/luna983/air-quality-machine-learning/blob/master/docs/manuscript.pdf) \| [Github](https://github.com/luna983/air-quality-machine-learning))

Plotting a histogram of the historical daily Air Pollution Index in Beijing, I noticed something weird. Why are there so many more observations falling into the 95-100 bin than the 100-105 bin? A McCrary density test (a statistical test to detect discontinuities in distributions) identifies this anomaly as highly significant, suggesting that the underlying data may have been manipulated.

__Figure: Histogram of Government Reported / Remotely Sensed Daily Air Pollution Index Values in Beijing, 2005-2013.__

<div id='research-pollution-hist-nav' align="center">
<table>
  <tr>
    <td id='rpt' style='text-align: center; cursor: pointer;'>Gov't Reported</td>
    <td id='sat' style='text-align: center; opacity: 0.5; cursor: pointer;'>Remotely Sensed</td>
  </tr>
</table>
</div>
<div id='research-pollution-hist'></div>

<br>
But why? The Chinese central government defines a “Blue Sky Day” as a day with an Air Pollution Index below 100. Anecdotal evidence suggests that local government officials change values above 100 to just below 100 to score more “Blue Sky Days” and meet environmental regulatory requirements.

Guess what they cannot manipulate? Satellite images! In this project, I leveraged a variety of remote sensing data to reconstruct historical air pollution levels in China. The most critical input is “aerosol optical depth”, which measures the extinction of a ray of light as it passes through the atmosphere, and is often correlated with particulate matter concentrations. Roughly speaking, this measures how “hazy” it is outside, and thus how bad the air pollution is.

Remotely-sensed observations have a complex relationship with ground-level air pollution measurements, which is heavily influenced by weather conditions. I assembled a comprehensive set of remotely sensed variables on temperature, humidity, wind speed, wind direction, planetary boundary height, pressure, and other pollutants, and trained an extreme gradient boosting model ([xgboost](https://xgboost.readthedocs.io/en/latest/)) to predict air pollution levels, using credible data in 2015-2016 as ground truth labels. (See more technical details in the [working paper](https://github.com/luna983/air-quality-machine-learning/blob/master/docs/manuscript.pdf).) As the figure shows, the distribution of the predicted daily air pollution index based on remotely sensed variables looks smoother and reveals systematic underreporting.

As I kept digging deeper, I realized that the construction of this dataset helps us answer an important question in environmental economics: what are the impacts of reducing data manipulation and improving data quality in environmental monitoring? Since 2013, the central Chinese government invested heavily in environmental monitoring equipment, spending 6 billion CNY (approximately 0.95 billion USD) in just one year (2015). While these effectively eliminated data manipulation by enforcing automatic and real-time data reporting, can they truly incentivize local regulators and improve air quality?

This question used to be notoriously challenging to answer with government-reported data. Almost by definition, before data was credibly reported, we don’t have pre-treatment air quality data - now we do from satellite images.

To answer this question, I exploit the staggered rollout of a policy that built air quality monitoring stations and enforced automatic data reporting across China. With a structural break estimate, I found that the policy did not translate into improvements in air quality within 5 years, despite the large costs of the program. Why? This is a subject for future research, but we speculate that the intensive monitoring of ambient air quality is not as direct as monitoring emissions and regulatory compliance, since the former is also affected by factors that local officials cannot control, such as weather conditions, and transboundary air pollution.

<script src="/assets/js/research-pollution-hist.js"></script>
