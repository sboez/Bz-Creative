# Bz-Creative

![GitHub top language](https://img.shields.io/github/languages/top/sboez/Bz-Creative) <img src="https://img.shields.io/badge/three.js-r116-orange"> ![GitHub](https://img.shields.io/github/license/sboez/Bz-Creative)


Open source to [my website](sandra.boez.fr).

## Work in progress... :construction:


## Challenge 

:rocket: **Physics :** Three.js doesn't have physic engine but several lib exists, I choose [cannon.js](https://github.com/schteppe/cannon.js) for its simplicity compared to others. Adding physics to a 3D model is tricky.

:package: **Webpack :** I'm not familiary with this yet, config was tedious but finally it works !

:chart_with_upwards_trend: **Performances :** Especially lights, shadows, reflections and physics are very heavy for our browsers. Some tricks was used to improve general performance and keep a good fps. I decided later to make the room and add his objects with Blender and export a .glb file. It's smaller, prettier and faster.

:robot: **Hosting :** I choose [Firebase](https://firebase.google.com/), it's complete and simple.


## Usage

Install dependencies :
```
npm install
```

Run local server :
```
npm start
```
