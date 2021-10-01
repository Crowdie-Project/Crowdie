# Crowdie
<p align="center">
  <a href="https://crowdie.readthedocs.io/">
         <img alt="Documentation" src="https://img.shields.io/readthedocs/crowdie">
  </a>
</p>

**A Crowdsourced News Platform**

Crowdie is a Wiki-style platform, where users can view global news or report local news. This was originally our graduation project/thesis, so it comes with some unusual technical details. You can read our [Project Report](https://github.com/Crowdie-Project/COMP-491-Final-Report/blob/main/Crowdie_COMP491_FinalReport.pdf) as a manual!

[Live Demo is available here](https://crowdie-demo.herokuapp.com/)

Q: Why is nothing showing up on the map?
A: One of the design goals of Crowdie was to address one of the unsolved problems of our time: Verifiability. How can we distinguish fake news or false reports? We check for IDENTICAL INDEPENDENT REPORTS before showing them on the map. In section 3.3.3 of our [report](https://github.com/Crowdie-Project/COMP-491-Final-Report/blob/main/Crowdie_COMP491_FinalReport.pdf) you can read more about the Anomaly Detection process that goes into play. In short, unless several people report the same event within geographic and temporal proximity to one another, the report will be hidden from view.

>React Native Maps:

![image](https://user-images.githubusercontent.com/43265579/113306987-0851be00-92db-11eb-9861-dd0cc0203675.png)
![image](https://user-images.githubusercontent.com/43265579/113306650-b1e47f80-92da-11eb-8d38-6250c212d54f.png)
