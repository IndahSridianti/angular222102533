import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';

declare const $ : any;


@Component({
  selector: 'app-mahasiswa',
  templateUrl: './mahasiswa.component.html',
  styleUrl: './mahasiswa.component.css'
})
export class MahasiswaComponent implements OnInit,AfterViewInit {

  data:any;
  table1:any;
  
  constructor (private http: HttpClient, private renderer : Renderer2){

  }
  ngAfterViewInit(): void {

    this.renderer.removeClass(document.body,"sidebar-open");
    this.renderer.addClass(document.body,"sidebar-closed");

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

        this.table1.clear();
        
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
  showTambahModal() : void {
    $('#tambahModal').modal('show');
  }
  postRecord() : void {
    let alamat = $('#alamatText').val();
    let JenisKelamin = $('#jenisKelaminSelect').val();
    let jp = $('#jpSelect').val();
    let nama = $('#namaText').val();
    let nim = $('#nimText').val();
    let statusNikah = $('#statusPernikahanSelect').val();
    let tahunMasuk = $('#tahunMasukText').val();
    let tanggalLahir = $('#tanggalLahirText').val();
    let tempatLahir = $('#tempatLahirText').val();

    if(nim.length == 0){
      alert("nim belum diisi");
      return;
    }

    if(nama.length == 0){
      alert("nama belum diisi");
      return;
    }
    
    if(tempatLahir.length == 0){
      alert("tempat lahir belum diisi");
      return;
    }
    
    if(alamat.length == 0){
      alert("alamat belum diisi");
      return;
    }
    
    if(tahunMasuk.length == 0){
      alert("tahun masuk belum diisi");
      return;
    }

    alamat = encodeURIComponent(alamat);
    JenisKelamin = encodeURIComponent(JenisKelamin);
    jp = encodeURIComponent(jp);
    nama = encodeURIComponent(nama);
    nim = encodeURIComponent(nim);
    statusNikah = encodeURIComponent(statusNikah);
    tahunMasuk = encodeURIComponent(tahunMasuk);
    tempatLahir = encodeURIComponent(tempatLahir);

    let url = "https://stmikpontianak.net/011100862/tambahMahasiswa.php" +
    "?alamat=" + alamat +
    "&jenisKelamin=" + JenisKelamin +
    "&jp=" + jp +
    "&nama=" + nama +
    "&nim=" + nim +
    "&statusPernikahan=" + statusNikah +
    "&tahunMasuk=" + tahunMasuk +
    "&tanggalLahir=" + tanggalLahir +
    "&tempatLahir=" + tempatLahir ;

    this.http.get(url).subscribe((data : any) => {
      console.log(data);

      alert(data.status + "--->" + data.message);

      this.bind_mahasiswa();
      $('#tambahMahasiswa').modal('hide');
    })
  }
}
