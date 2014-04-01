FramerWebView
=============

A simple web viewer for Framer.JS prototypes. Replace the iframe src in **index.html** with the URL of your prototype, then open it up in your browser and you're good to go! FramerWebView assumes iPhone prototypes sized 640px x 1136px, and Android prototypes sized 720px x 1280px.

Example: https://s3-us-west-2.amazonaws.com/tweakapp.co/Framewebview/index.html

![FramerWebView Example](https://s3-us-west-2.amazonaws.com/tweakapp.co/Framewebview/framerwebview.png)

Features
--------
* Resize your browser, prototype automatically scales down
* Hit P to toggle between a black and white iPhone
* Hit H to toggle the hand off and on
* Hit B to cycle through various backgrounds (customize these in the backgrounds array in main.js)
* Hit D to swap between iPhone and Android devices
* Hit Z to zoom in to 100%
* Mouse cursor is replaced by an easier to track bobble - add this to your prototype's CSS:

```
* {
cursor: url("https://s3-us-west-2.amazonaws.com/tweakapp.co/Framewebview/bobble.png"), default;
}
```
