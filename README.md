# Introduction

This repository is part of my school project. My school project aims to research and develop an application to visualize the interactions between computer machines through Augmented Reality(AR) during an Attack and Defense Challenge. During the challenge, each individual will be assigned to a computer and all of them will split into two different teams (Red & Blue). Red Team plays the offense and conduct attacks against the Blue team. On the other hand, the Blue Team members will defend against any incoming attacks.

I am tasked to develop an application that allow users(spectators/participants) to see the actions (attack/defense) conducted by each team through AR and 3D modelling. Each computer machine will have a physical AR Marker for machine identification. Users will load the AR application onto their phones and move around the room/lab where the Challenge is held. When an AR marker(barcode marker)is within the phone camera view, the application will check for the machine's identity based on the barcode value of the marker. After identifying the machine, the application will display out Real-Time actions (in the form of coloured spheres) that are conducted by/ targeted towards the machine.

# How it works
## 1. Get Compatible Browser

The program runs in any browser with WebGL and WebRTC. I tested my application on iphone 5 Safari and on chrome on my laptop. For iphone users, you will be required to update to iOS 11. 

## 2. Prepare AR Markers

Get AR barcode markers that have the value of 5 and 3. You may get the marker for value of 5 [here](https://github.com/artoolkit/artoolkit5/blob/master/doc/patterns/Matrix%20code%203x3%20(72dpi)/5.png) and the marker for value of 3 [here](https://github.com/artoolkit/artoolkit5/blob/master/doc/patterns/Matrix%20code%203x3%20(72dpi)/3.png). I made a combination of both here:

![mergedmarkers.jpg](https://raw.githubusercontent.com/Xdecosee/ar-data-insertion/master/resources/mergedmarkers.JPG)

## 3. Load up Data insertion page

We will need to show real-time data on our AR application by inserting data into database. Hence, load the data insertion page first. You may access either at [here](https://projectadmin.glitch.me/) or [here](https://rawgit.com/Xdecosee/ar-data-insertion/master/index.html). You should see a page similar to this and the number under "Integer Added to Database" should be changing.

![datainsertionpage.png](https://raw.githubusercontent.com/Xdecosee/ar-data-insertion/master/resources/datainsertionpage.PNG)

Each number represent an action. The classification of actions can be found [under 'Action Types'](https://github.com/Xdecosee/ar-project#action-types).


## 4. Load AR application

Access the AR application via a compatible browser (from Step 1) with this [link](https://projectar.glitch.me/). Click 'Allow' to allow application to access your camera on your device.

![destopperm.png](https://raw.githubusercontent.com/Xdecosee/ar-data-insertion/master/resources/desktopperm.png)

![permissioncam.png](https://raw.githubusercontent.com/Xdecosee/ar-data-insertion/master/resources/permissioncam.png)


Point your webcam or phone camera to the AR Markers (from Step 2). If there are real-time data inserted into database, you can see coloured spheres moving from one marker to the other. You will also be able to see the naming of the latest sphere moving out from the marker. Otherwise, you will only see the CROW Logo , red box and blue box. 

**Example View on Laptop with Webcam (Chrome)**
![desktop.png](https://raw.githubusercontent.com/Xdecosee/ar-data-insertion/master/resources/desktop.PNG)

**Example View on iphone 5 Safari (iOS 11)**
![mobile.png](https://raw.githubusercontent.com/Xdecosee/ar-data-insertion/master/resources/mobile.png)


_Note:_ Other data will be inserted into the database via other instances of the data insertion page or when other people load the page as well. Hence, other data fired from other instances of the page can also pop up in the AR application as well. 

Select the checkbox "More info" to see ip address and hostname of the machines that the markers represent. If there are two markers in view, you can see the lastest three data entries related to the two markers in view. If there is one marker in view, you can see the lastest three data entries related to that one marker. 'Outbound' means that the machine is the source of the action. 'Inbound' means that the machine is the target of the action.

**Note:** Please do not leave the data insertion page running for many hours as the database used (MongoDB Atlas Free Tier) has limited storage space of 512MB. To stop inserting new data, close the data insertion page. In addition, if you are not able to load any of the application, it might be possible that the Glitch Service is [down](http://status.glitch.com/).

**Two Markers**
![doubletable.png](https://raw.githubusercontent.com/Xdecosee/ar-data-insertion/master/resources/doulbletable.PNG)

**One Marker**
</br>
_Marker with Barcode Value of 5_
![redtable.png](https://raw.githubusercontent.com/Xdecosee/ar-data-insertion/master/resources/redtable.PNG)
_Marker with Barcode Value of 3_
![bluetable.png](https://raw.githubusercontent.com/Xdecosee/ar-data-insertion/master/resources/bluetable.PNG)

# Action Types

**Note:** I was only given a list of the types of attacks that participants have performed in the past years of the challenge. Hence for the defending actions, I decided to just call them as defense1, defense2 and defense3.

| Attack Type    | Int    | Colour|
| --------|---------|-------|
| Normal  | 1 |Green|
| Reconnaissance | 2 |Yellow|
| SQL Injection | 3 |Orange|
| Semantic URL Attack | 4 |Pink|
| Command Injection | 5 |Purple|
| Remote Code Execution | 6 |Light Blue|
| URL Manipulation | 7 |Brown|
| Privilege Escalation | 8 |Blue|
| Directory Traversal Attack | 9 |Red|

<br/>

| Defense Type    | Int    | Colour|
| --------|---------|-------|
| defense1 | 10 |Dark Green|
| defense2 | 11 |Gray|
| defense3 | 12 |Light Pink|

# Limitations of this project

There are certain limitations and challenges I faced while doing this project over three months. I was not able to solve certain problems. 

* Free Tier of MongoDB Atlas has **limited storage space.**

* Markers must be **always within camera view**. 

  Hence, I wasn't able to further develop my project to generate the animation on multiple markers that are placed far apart from each other (since the machines will be far apart from each other). The current state of the project can only handle 2 markers within camera view at all times.
  
  **Add On:** I looked into other possible solutions (Vuforia/Wikitude/Markerless AR technology) and did not have the time to fully test them over the course of my school project.
  
  **Tip:** If you have two identical markers (e.g. two markers with the value of 3)in front of the camera, the application will not be able show the relevant animations (table and box). 

* Some parts of the source code are **hardcoded**. 

  E.g. To check for visibility of markers constantly, it requires you to state _if(marker.visible)===true_ for each marker. With regards to this particular issuee, I tried to implement a for loop function that constantly check for visibility of markers but the program gets very laggy. Have not tried implementing any function that works in the application background to poll for visibility of markers

* There is a **program glitch**.In a very split second, the coloured sphere may appear at the destination marker before appearing the marker where it is suppose to start from before moving along the invisible curve path.

* Animations are **not fully designed perfectly**. 

  When there are changes to phone orientation, the sizes of the animation may become small or animation may become more pixelated. Web page height & width may be affected as well and may require to zoom in and out of the screen to see the animations.
  
  Spheres may be rendered and displayed behind boxes instead.
  
* **Application performance**

  Application performance differs for different browsers on different devices. Rendered animation may be blurry , pixelated or laggy based on the browser and device used. There can be heavy delays in updating data or action naming as well. 
  
* **Rapid large amount of data**

  Application is unable to update the action naming's quickly if there is large amounts of data inserted rapidly. Hence, the action naming may not be update correctly. 
  
* Data pulled into _index.html_ via jQuery **may not be the latest set of data** as may require refreshing of _server.js_.

```
$(function() {

      $.get('/machines', function(machines) {
          for (var i = 0; i < machines.length; i++) {
              machineArr[i] = machines[i];
          }
      });

});
```

# Credits
* Augmented Reality
  
  * [AR.js](https://github.com/jeromeetienne/AR.js)
  
* 3D Modelling

  * [THREE.js](https://threejs.org/)
  
*  Database
    * [MongoDB Atlas](https://www.mongodb.com/cloud/atlas): Providing Database in cloud _(Note: I used the free tier)_ 

    * [MongoDB Compass](https://www.mongodb.com/products/compass): Analyse and View data within a desktop application. It is a useful tool to set validation rules, manage indexes, modify and analyse data easily. _(Note: I used Windows 64-bit 1.10.8(Stable) version of Compass)_

* Online Editor

  * [Glitch](https://glitch.com/)

* NPM Packages

  * [Socket.IO](https://www.npmjs.com/package/socket.io): Help to transfer data from _server.js_ to the client side(_index.html_)

  * [Express](https://www.npmjs.com/package/express)

  * [MongoDB](https://www.npmjs.com/package/mongodb)
  
* User Controls
  
  * [dat.GUI](https://github.com/dataarts/dat.gui)

# Other Resources

* Server.js

  * [Querying Oplog](https://www.compose.com/articles/the-mongodb-oplog-and-node-js/): Help to retrieve real-time data from database by listening for insertions 

* index.html

  * [Window Resize](https://github.com/jeromeetienne/threex.windowresize)

  * [Animation between two AR Markers](https://github.com/jeromeetienne/AR.js/blob/master/three.js/examples/measure-it.html)

  * [3D model of Box with hole](https://clara.io/view/053f6cc3-d593-429e-8938-0ded52dfffa6)

  * [dat.GUI checkbox changes event listener](https://davidwalsh.name/dat-gui)
  
  * [Object Moving on Line](http://jsfiddle.net/qGPTT/133/)
  
  
# Help

If you have suggestions or have questions, you may post them under Issues Tab. 
