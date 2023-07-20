import { Component } from '@angular/core';
import { MetronomeComponent } from '../app/metronome/metronome.component';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  button1Click() {
    // Lógica del botón 1
    console.log('Botón 1 clickeado');
  }

  button2Click() {
    // Lógica del botón 2
    console.log('Botón 2 clickeado');
  }
}
