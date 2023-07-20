import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-metronome',
  templateUrl: './metronome.component.html',
  styleUrls: ['./metronome.component.css']
})
export class MetronomeComponent implements OnInit {
  private audioContext: AudioContext;
  private gainNode: GainNode;
  private intervalId: any = null;
  public metronomeBars: number[];
  public tempoValue: number;
  public needlePosition: string;
  public tempo: number = 60;
  private lightPosition: string = '0%';
  private beatsPerMeasure: number = 4;
  public isPlaying: boolean = false;

  constructor() {
    this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    this.gainNode = this.audioContext.createGain();
    this.intervalId = undefined;
    this.isPlaying = false;
    this.metronomeBars = [1, 2, 3, 4];
    this.tempoValue = 60;
    this.needlePosition = '0%';
    this.tempo = 60;
    // Initialize audio context
    this.initializeAudioContext();

  }
  calculateInterval() {
    return 60000 / this.tempo; // Calcula el intervalo en base al tempo actual
  }
  calculateBarWidth() {
    return `${100 / this.metronomeBars.length}%`;
  }

  ngOnInit() {
    this.gainNode.connect(this.audioContext.destination);
  }
  private async initializeAudioContext() {
    try {
      // The context needs to be started from a user gesture (e.g., click)
      await this.audioContext.resume();
      console.log('Audio context initialized.');
    } catch (error) {
      console.error('Error initializing audio context:', error);
    }
  }

  start() {
    if (!this.isPlaying) {
      this.isPlaying = true;
      this.playMetronome();
    }
  }

  stop() {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId!);
      this.intervalId = null;
    }
    this.isPlaying = false;
  }

  private playMetronome() {
    const interval = 60000 / this.tempo;
    this.moveLight();
    this.intervalId = setInterval(() => {
      this.playSound();
      this.moveLight();
    }, interval);
  }

  playSound() {
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.frequency.value = 1000; // Frecuencia del sonido (puedes ajustarla a tu gusto)
    oscillator.type = 'square'; // Tipo de forma de onda (puedes probar con 'sine', 'sawtooth', 'triangle', etc.)
    oscillator.connect(gainNode);
    gainNode.connect(this.gainNode);

    oscillator.start();
    oscillator.stop(this.audioContext.currentTime + 0.1); // Duración del sonido en segundos (ajustar según tus necesidades)
  }
  increaseTempo() {
    this.tempo += 10;
    if (this.tempo > 360) {
      this.tempo = 360;
    }
    if (this.isPlaying) {
      clearInterval(this.intervalId);
      this.startMetronome();
    }
  }

  decreaseTempo() {
    this.tempo -= 10;
    if (this.tempo < 1) {
      this.tempo = 1;
    }
    if (this.isPlaying) {
      clearInterval(this.intervalId);
      this.startMetronome();
    }
  }
  startMetronome() {
    if (this.intervalId === undefined || this.intervalId === null) {
      this.intervalId = setInterval(() => {
        // Lógica del metrónomo
  
        // Lógica del movimiento de la luz
        this.moveLight();
      }, this.calculateInterval()) as any;
    }
  }
  
  stopMetronome() {
    if (this.intervalId !== undefined && this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
  moveLight() {
    const maxLeft = 0; // Posición más a la izquierda
    const maxRight = 100; // Posición más a la derecha
    let currentPosition = maxLeft;
    let direction = 1; // 1 para moverse hacia la derecha, -1 para moverse hacia la izquierda

    setInterval(() => {
      if (currentPosition === maxRight) {
        direction = -1; // Cambia la dirección a izquierda
      } else if (currentPosition === maxLeft) {
        direction = 1; // Cambia la dirección a derecha
      }

      currentPosition += direction;
      // Actualiza la posición de la luz en el estilo CSS
      this.lightPosition = currentPosition + '%';
    }, 100); // Intervalo de tiempo en milisegundos (0.1 segundos)
  }
} 