import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';

declare const $ : any;


@Component({
  selector: 'app-mahasiswa',
  templateUrl: './mahasiswa.component.html',
  styleUrl: './mahasiswa.component.css'
})
export class MahasiswaComponent implements OnInit,AfterViewInit {

  data:any;
  table1:any;
  
  constructor (private http: HttpClient){

  }
  ngAfterViewInit(): void {
    this.table1 = $("#table1").DataTable();
    this.bind_mahasiswa();
  }
  ngOnInit(): void {
    
  }
  // 
  bind_mahasiswa(): void {
    this.http.get("https://stmikpontianak.net/011100862/tampilMahasiswa.php")
      .subscribe((data: any) => {
        console.log(data);
        
        data.forEach((e: any) => {
          let ttl = e.TempatLahir + ", " + e.TanggalLahir;

          let rows = [
            e.NIM,
            e.Nama,
            e.JenisKelamin,
            ttl,
            e.JP,
            e.Alamat,
            e.StatusNikah,
            e.TahunMasuk
          ];

          this.table1.row.add(rows);  // Menambahkan baris ke DataTable
        });

        this.table1.draw(false);  // Menggambar tabel setelah menambahkan semua baris
      });
  }
}
