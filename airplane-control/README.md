*Used create-react-app to generate initial templayed

Run Instructions-

1. `npm install`  
2. `npm start`  
3. adjust yaw and speed using the sliders


logic-

The airplane position is updated and traced based on:
  - user input of yaw (degrees relative to initial center point)
  - user input of air speed 
  - the airplane’s position is updated every 100ms using the following formulas:
    1. const dx = Math.cos(yaw) * speed
    2. const dy = -Math.sin(yaw) * speed


note: utilized wrap for handling canvas edges 

logic for handling edge wrapping:
1. x = (x + canvas.width) % canvas.width 
2. y = (y + canvas.height) % canvas.height

