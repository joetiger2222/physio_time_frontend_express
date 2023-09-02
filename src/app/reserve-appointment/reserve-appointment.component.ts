import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reserve-appointment',
  templateUrl: './reserve-appointment.component.html',
  styleUrls: ['./reserve-appointment.component.css'],
})
export class ReserveAppointmentComponent {
  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  doctorId: string = '';
  timesLoading: boolean = false;
  isReserveingLoading: boolean = false;
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.doctorId = params['doctorId'];
    });
  }
  mySingleDayData: singleAppointment[]=[];

  date: string = '';
  choosenTime: string = '';
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
      this.date = info.startStr;
      this.getAvaibleAppts(info.startStr);
    },
    hiddenDays: [5],
    headerToolbar: {
      start: 'title', // Display the title on the left
      center: '', // Remove buttons from the center
      end: 'prev,next', // Display only prev and next buttons on the right
    },
  };

  openModal(time: string) {
    this.choosenTime = time;
    console.log(this.choosenTime);
    const modalDiv = document.getElementById('myModal');
    if (modalDiv != null) {
      modalDiv.style.display = 'flex';
    }
  }

  closeModal() {
    const modalDiv = document.getElementById('myModal');
    if (modalDiv != null) {
      modalDiv.style.display = 'none';
    }
  }

  openSuccedessModal() {
    const modalDiv = document.getElementById('succededModal');
    if (modalDiv != null) {
      modalDiv.style.display = 'flex';
    }
  }

  closeSuccedessModal() {
    const modalDiv = document.getElementById('succededModal');
    if (modalDiv != null) {
      modalDiv.style.display = 'none';
    }
    this.getAvaibleAppts(this.date);
  }

  getAvaibleAppts(date: string) {
    this.timesLoading = true;
    this.mySingleDayData=[];
    this.http
      .get<singleAppointment[]>(
        `https://physio-time-2.onrender.com/availbleAppointments/${this.doctorId}/${date}`
      )
      .subscribe({
        // next:res=>res.times.length>0?this.mySingleDayData=res:null,
        next: (res) => {
          console.log(`getAvaibleAppts ~ res:`, res)
          this.timesLoading = false;
          if (res.length > 0) {
            this.mySingleDayData = res;
          } else {
            null;
          }
          console.log(this.mySingleDayData);
        },
        error: (err) => {
          this.timesLoading = false;
          console.log(err);
        },
      });
  }

  onSubmit(elemet: NgForm) {
    this.isReserveingLoading = true;
    const body = {
      date: this.date,
      time: this.choosenTime,
      doctorId: this.doctorId,
      patientName: elemet.value.name,
      patientPhoneNumber: elemet.value.phoneNumber,
      patientEmail: elemet.value.email,
      // patientAge: 22,
    };
    console.log(body)
    this.http
      .post(
        `https://physio-time-2.onrender.com/reserveAppointment/${this.doctorId}`,
        body
      )
      .subscribe({
        next: (res) => {
          this.isReserveingLoading = false;
          console.log(res);
          this.closeModal();
          this.openSuccedessModal();
        },
        error: (err) => {
          console.log(err.error);
          this.isReserveingLoading = false;
        },
      });
  }

  convertTimeToNumber(time: any) {
    const hours: number = Number(time.slice(0, 2));
    if (hours * 1 > 12) {
      return hours - 12 + ':00 PM';
    }
    return hours * 1 + ':00' + ' AM';
  }

  isTimeAvailble(time: any) {
    const hours: number = Number(time.slice(0, 2));
    const date = new Date();
    const currentHour: number = Number(date.toString().slice(16, 18));
    if (date.toISOString().slice(0, 10) === this.date) {
      if (currentHour + 3 > hours) {
        return false;
      } else {
        return true;
      }
    }
    return true;
  }
}

interface singleAppointment {
  date: string;
  dayId: string;
  doctorId: string;
  isAvailable: boolean;
  time: string;
  _id: number;
}
