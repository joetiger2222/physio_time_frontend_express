import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CalendarOptions, EventClickArg } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import {HttpClient} from '@angular/common/http';
@Component({
  selector: 'app-addnewdays',
  templateUrl: './addnewdays.component.html',
  styleUrls: ['./addnewdays.component.css']
})
export class AddnewdaysComponent {
  doctorId:string="";
  choosenDate:string="";
  startTime:number=0;
  endTime:number=0;
  isLoading:boolean=false;
  constructor(private route:ActivatedRoute,private http:HttpClient){}
  ngOnInit(){
    this.route.params.subscribe(params=>{
      this.doctorId=params['doctorId'];
    })
  }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    eventColor: '#378006',
    selectable: true,
    validRange: {
      start: new Date().toISOString().slice(0, 10),
    },
    longPressDelay: 0,

    select: (info) => {
      this.choosenDate = info.startStr
      const el=document.getElementById('warningMessage');
      if(el!==null){
        
        el.style.display="none";
      }
    },
    hiddenDays: [5],
    headerToolbar: {
      start: 'title', // Display the title on the left
      center: '', // Remove buttons from the center
      end: 'prev,next', // Display only prev and next buttons on the right
    },
  };

  

  addForDay(){
    this.isLoading=true;
    if(this.startTime<=0){
      const el=document.getElementById('warningMessage');
      if(el!==null){
        el.innerHTML="Please Enter A Valid Start Time";
        el.style.display="block";
      }
      this.isLoading=false;
      return;
    }
    if(this.endTime<=0||this.endTime<=this.startTime){
      const el=document.getElementById('warningMessage');
      if(el!==null){
        el.innerHTML="Please Enter A Valid End Time";
        el.style.display="block";
      }
      this.isLoading=false;
      return;
    }
    const body={
      // doctorId:this.doctorId,
      // appointmentDay:this.choosenDate,
      // start:this.startTime<10?'0'+this.startTime+':00:00': this.startTime+':00:00',
      // end:this.endTime<10?'0'+this.endTime+':00:00':this.endTime+':00:00'
      start:this.startTime,
      end:this.endTime,
      date:this.choosenDate,
    }
    var arr=[];
    arr.push(body);
    console.log(body);
    this.http.post(`https://physio-time-2.onrender.com/addAppointments/${this.doctorId}`,body).subscribe({
      next:res=>{
        this.isLoading=false;
        console.log(res);
        const el=document.getElementById('warningMessage');
        if(el!==null){
          el.innerHTML='Appointements Added Successfully';
          el.style.display="block";
          el.style.color='rgb(82, 147, 25)'
        }
      },
      error:err=>{
        console.log(err);
        this.isLoading=false;
        const el=document.getElementById('warningMessage');
        if(el!==null){
          el.innerHTML='You Already Have Appointments In This Date If You Wish To Edit Please Go To Edit Appointments'
          el.style.display="block";
          el.style.color="red";
        }
      }
    })
  }

  addForTheMonth(){
    this.isLoading=true;
    if(this.startTime<=0){
      const el=document.getElementById('warningMessage');
      if(el!==null){
        el.innerHTML="Please Enter A Valid Start Time";
        el.style.display="block";
      }
      this.isLoading=false;
      return;
    }
    if(this.endTime<=0||this.endTime<=this.startTime){
      const el=document.getElementById('warningMessage');
      if(el!==null){
        el.innerHTML="Please Enter A Valid End Time";
        el.style.display="block";
      }
      this.isLoading=false;
      return;
    }
    var arr=[];
    const day: number = Number(this.choosenDate.slice(8, 10));
    console.log(day)
    var iteration:number=0;
    if(this.choosenDate.slice(5, 7)==="01"||this.choosenDate.slice(5, 7)==="03"||this.choosenDate.slice(5, 7)==="07"||this.choosenDate.slice(5, 7)==="08"||this.choosenDate.slice(5, 7)==="10"||this.choosenDate.slice(5, 7)==="12"){
      iteration=31
    } else if(this.choosenDate.slice(5, 7)==="02"){
      iteration=29
    }else {
      iteration=30;
    }
    for(let i=day;i<=iteration;i++){
      const body={
        // doctorId:this.doctorId,
        // appointmentDay:this.choosenDate.slice(0, 7)+'-'+i.toString().padStart(2, '0'),
        // start:this.startTime<10?'0'+this.startTime+':00:00': this.startTime+':00:00',
        // end:this.endTime<10?'0'+this.endTime+':00:00':this.endTime+':00:00'
        start:this.startTime,
      end:this.endTime,
      date:this.choosenDate.slice(0, 7)+'-'+i.toString().padStart(2, '0'),
      }
      arr.push(body)
    }
   
    console.log(arr)
    this.http.post(`https://physio-time-2.onrender.com/addAppointmentForMonth/${this.doctorId}`,{dates:arr}).subscribe({
      next:res=>{
        console.log(res);
        this.isLoading=false;
        const el=document.getElementById('warningMessage');
        if(el!==null){
          el.innerHTML='Appointements Added Successfully';
          el.style.display="block";
          el.style.color='rgb(82, 147, 25)'
        }
      },
      error:err=>{
        this.isLoading=false;
        console.log(err);
        const el=document.getElementById('warningMessage');
        if(el!==null){
          el.innerHTML='Some Of The Dates Already Have Appointments If You Wish To Edit Please Go To Edit Appointments';
          el.style.display="block";
          el.style.color="red";
        }
      }
    })
  }
}
