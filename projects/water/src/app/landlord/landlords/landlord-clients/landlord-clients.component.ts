import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-landlord-clients',
  templateUrl: './landlord-clients.component.html',
  styleUrls: ['./landlord-clients.component.css']
})
export class MngLandlordClientsComponent {

  @Input() landlord_id: number | null = null;

}
