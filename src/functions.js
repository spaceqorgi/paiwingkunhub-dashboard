import * as dayjs from 'dayjs'

export function formatPhoneNumber (phoneNumberString) {
  const cleaned = (`${  phoneNumberString}`).replace(/\D/g, '')
  let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
  // Check 080-000-0000
  if (match) {
    return `${  match[1]  }-${  match[2]  }-${  match[3]}`
  }
  match = cleaned.match(/^(\d{2})(\d{3})(\d{4})$/)
  // Check 02-000-0000
  if (match) {
    return `${  match[1]  }-${  match[2]  }-${  match[3]}`
  }
  return null
}

export function formatDate (date) {
  return dayjs(date).format('DD/MM/YYYY')
}

export function formatDateTime (date) {
  return dayjs(date).format('DD/MM/YYYY HH:mm:ss')
}

export function bankCodeToBankName (bankCode) {
  switch (bankCode) {
  case '014':
    return { name: 'ธนาคารไทยพาณิชย์', acronym: 'SCB', swiftCode: '' }
  }
}

export const thaiBankInfo = {
  '001': {
    name: 'ธนาคารแห่งประเทศไทย',
    since: 2485,
    type: 'ธนาคารแห่งชาติ',
    acronym: 'BOTH',
    swiftCode: 'BOTHTHBK'
  },
  '002': {
    name: 'ธนาคารกรุงเทพ',
    since: 2487,
    type: 'บริษัทมหาชน',
    acronym: 'BBL',
    swiftCode: 'BKKBTHBK'
  },
  '004': {
    name: 'ธนาคารกสิกรไทย',
    since: 2488,
    type: 'บริษัทมหาชน',
    acronym: 'KBANK',
    swiftCode: 'KASITHBK'
  },
  '006': {
    name: 'ธนาคารกรุงไทย',
    since: 2509,
    type: 'บริษัทมหาชน',
    acronym: 'KTB',
    swiftCode: 'KRTHTHBK'
  },
  '011': {
    name: 'ธนาคารทหารไทย',
    since: 2499,
    type: 'บริษัทมหาชน',
    acronym: 'TMB',
    swiftCode: 'TMBKTHBK'
  },
  '014': {
    name: 'ธนาคารไทยพาณิชย์',
    since: 2449,
    type: 'บริษัทมหาชน',
    acronym: 'SCB',
    swiftCode: 'SICOTHBK'
  },
  '025': {
    name: 'ธนาคารกรุงศรีอยุธยา',
    since: 2488,
    type: 'บริษัทมหาชน',
    acronym: 'BAY',
    swiftCode: 'AYUDTHBK'
  },
  '069': {
    name: 'ธนาคารเกียรตินาคินภัทร',
    since: 2514,
    type: 'บริษัทมหาชน',
    acronym: 'KKP',
    swiftCode: 'KIFITHB1'
  },
  '022': {
    name: 'ธนาคารซีไอเอ็มบีไทย',
    since: 2492,
    type: 'บริษัทมหาชน',
    acronym: 'CIMBT',
    swiftCode: 'UBOBTHBK'
  },
  '067': {
    name: 'ธนาคารทิสโก้',
    since: 2548,
    type: 'บริษัทมหาชน',
    acronym: 'TISCO',
    swiftCode: 'TFPCTHB1'
  },
  '065': {
    name: 'ธนาคารธนชาต',
    since: 2545,
    type: 'บริษัทมหาชน',
    acronym: 'TBANK',
    swiftCode: 'THBKTHBK'
  },
  '024': {
    name: 'ธนาคารยูโอบี',
    since: 2549,
    type: 'บริษัทมหาชน',
    acronym: 'UOBT',
    swiftCode: 'UOVBTHBK'
  },
  '071': {
    name: 'ธนาคารไทยเครดิตเพื่อรายย่อย',
    since: 2547,
    type: 'ธนาคารเอกชน',
    acronym: 'TCD',
    swiftCode: 'THCETHB1'
  },
  '073': {
    name: 'ธนาคารแลนด์แอนด์ เฮ้าส์',
    since: 2552,
    type: 'บริษัทมหาชน',
    acronym: 'LHFG',
    swiftCode: 'LAHRTHB1'
  },
  '070': {
    name: 'ธนาคารไอซีบีซี (ไทย)',
    since: 2553,
    type: 'บริษัทมหาชน',
    acronym: 'ICBCT',
    swiftCode: 'ICBKTHBK'
  },
  '098': {
    name: 'ธนาคารพัฒนาวิสาหกิจขนาดกลางและขนาดย่อมแห่งประเทศไทย',
    since: 2545,
    type: 'ธนาคารของรัฐบาล',
    acronym: 'SME'
  },
  '034': {
    name: 'ธนาคารเพื่อการเกษตรและสหกรณ์การเกษตร',
    since: 2486,
    type: 'ธนาคารของรัฐบาล',
    acronym: 'BAAC',
    swiftCode: 'BAABTHBK'
  },
  '035': {
    name: 'ธนาคารเพื่อการส่งออกและนำเข้าแห่งประเทศไทย',
    since: 2536,
    type: 'ธนาคารของรัฐบาล',
    acronym: 'EXIM',
    swiftCode: 'EXTHTHBK'
  },
  '030': {
    name: 'ธนาคารออมสิน',
    since: 2456,
    type: 'ธนาคารของรัฐบาล',
    acronym: 'GSB',
    swiftCode: 'GSBATHBK'
  },
  '033': {
    name: 'ธนาคารอาคารสงเคราะห์',
    since: 2496,
    type: 'ธนาคารของรัฐบาล',
    acronym: 'GHB'
  },
  '066': {
    name: 'ธนาคารอิสลามแห่งประเทศไทย',
    since: 2545,
    type: 'ธนาคารของรัฐบาล',
    acronym: 'ISBT',
    swiftCode: 'TIBTTHBK'
  },
  '-999': {
    name: 'ไม่พบขัอมูลธนาคาร',
    since: 'ไม่พบขัอมูลธนาคาร',
    type: 'ไม่พบขัอมูลธนาคาร',
    acronym: 'ไม่พบขัอมูลธนาคาร',
    swiftCode: 'ไม่พบขัอมูลธนาคาร'
  }
}
