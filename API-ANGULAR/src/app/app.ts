import { Component, OnInit, signal } from '@angular/core';
import { Api, Usuario } from './services/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('API-ANGULAR');
  usuarios = signal<Usuario[]>([]);
  cargando = signal(false);
  error = signal<string | null>(null);

  constructor(private apiService: Api) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.cargando.set(true);
    this.error.set(null);

    this.apiService.obtenerUsuarios().subscribe({
      next: (datos: Usuario[]) => {
        this.usuarios.set(datos.slice(0, 5));
        this.cargando.set(false);
      },
      error: (err) => {
        console.error('Error al cargar usuarios:', err);
        this.error.set('Error al cargar los datos. Por favor, intenta de nuevo.');
        this.cargando.set(false);
      }
    });
  }
}
