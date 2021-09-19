Steps to run the web app
1. npm install
2. npx http-server . 8080
3. npm start (optional, the express server to be able to change models in app doesn't work properly)


Our webapp takes in a .stl model file and then exports it into a GLTF model file. This will need to be converted back into an STL file using meshlab and then use a slicer to "slice it" for the 3d printer. 

Limitations:
1. You might need to make the models directory in the repo (this is something I didn't test)
2. the import feature doesn't work with all models for some reason, we don't know why
3. Scaling might need to be done manually by modifying the numbers divided by object3DDepth and object3DWidth for scaling. The position can be modified from lines 60-63. Refresh once you want to test your modifications.

devpost: https://devpost.com/software/notwheels