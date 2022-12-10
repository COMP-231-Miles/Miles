import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-policies',
  templateUrl: './policies.component.html',
  styleUrls: ['./policies.component.scss']
})
export class PoliciesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  policies: Policies[] = [
    {
      title: "The Rental Agreement",
      description: "These Rental Terms and Conditions, the rental document you receive when you are given access to the car you are renting (the 'Rental Contract') any additional agreement signed by you, any documents or agreements (or links to on-line documents or agreements) sent to you electronically in connection with your rental, the Privacy Notice, and the return receipt or record (the 'Rental Receipt') with computed rental charges together constitute the 'Rental Agreement' between yourself and our company (Miles)"
    },
    {
      title: "Your Rental",
      description: "You rent from Miles the car described on the Rental agreement, which states rental is solely a transfer of possession, and not of ownership."
    },
    {
      title: "Changes",
      description: "Any changes must be approved by and authorized personnel from Miles and must be in writing. The changes to the rental contract will only apply after the date of notice."
    },
    {
      title: "Meaning of Car",
      description: "The meaning of car in the agreement is the whole car including wheels, keys, fobs, license plate and any other optional accessories stated in the agreement."
    },
    {
      title: "Who may drive the car",
      description: "Only the person who rents out the car with a valid drivers license and other drivers with valid driver’s license mentioned and shown at the time of rental. Extra charges may be applicable for drivers younger than the age of 25. Driver’s license will be checked before giving the car for rental to check for driving records that might make driver ineligible or extra deposit might be taken from risky drivers."
    },
    {
      title: "Return of Car",
      description: "You are expected to return the car in the same condition you rented. If there are any extra damages or cleanliness issues with the car then extra charges will apply to the payment method on file."
    },
    {
      title: "Return Location",
      description: "You are expected to return the car to the location stated on the agreement at the time you take out the rental. Return to any other location will result in an extra charge."
    },
    {
      title: "Taxes, surcharges and Fees",
      description: "You will also pay any extra charges or taxes on top of the rental amount on the car to cover extra costs."
    },
    {
      title: "Loss Damage Waiver",
      description: "If you do get the loss and damage coverage on your rental car, your car will be covered for any such issues unless not covered by the law. You will be charged a daily fee for such insurance on your rental. This insurance is not mandatory requirement but if you don’t take it, then you will be responsible to pay for any damages from your payment method."
    },
    {
      title: "Prohibited use of the car",
      description: "Certain uses of the car are prohibited such as using it to race, allowing more passengers to sit than the amount of seat belts, driving under influence of alcohol or drugs, cannot drive across borders without the permission of the company."
    }
  ]

}

export interface Policies {
  title: string;
  description: string;
}
