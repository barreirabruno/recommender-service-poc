type SponsorData = {
  id: string
  content: string
}

export class Sponsor {
  id: string
  content: string

  constructor (sponsorData: SponsorData) {
    this.id = sponsorData.id
    this.content = sponsorData.content
  }
}
