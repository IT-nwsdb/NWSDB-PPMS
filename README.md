# Project Progress Monitoring System (Card-only)

## How to run
1. Unzip the folder
2. Open `index.html` in your browser

## Fix
Cards are now ALWAYS centered (no 'short screen' override).
If your window is very short, it will still scroll while keeping a centered layout.


## Integrated Modules
- RH opens `RH/index.html`
- NRW opens `NRW/index.html`
- E&S/WSP opens `E&S/index.html`
- US opens `US/index.html`

## NRW Update
The NRW card on the home page is now connected to the NRW Budget Management System. The NRW module is included inside the `NRW/` folder and keeps its own Firestore connection and `NRW/firestore.rules` file.
