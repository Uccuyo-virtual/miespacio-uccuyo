const fs = require('fs');
const file = 'c:\\Users\\usuario\\Desktop\\webDEad\\src\\components\\FeatureGrid.tsx';
let content = fs.readFileSync(file, 'utf8');
let lines = content.split(/\r?\n/);

// Update import (line 2)
lines[1] = 'import { Wallet, Trophy, Sparkles, Dumbbell, Monitor, BookText, Car, Clock, Battery, BatteryMedium, BatteryFull, Bus, Bike, Copy, Check } from "lucide-react"';

// Remove Row 2 cards (lines 428-692)
lines.splice(427, 265);

// Remove Networking Hub State (lines 103-142)
lines.splice(102, 40);

fs.writeFileSync(file, lines.join('\n'));
