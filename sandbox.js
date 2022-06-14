const req_body = {
  nama_member_1: 'tester 01',
  no_wa_1: '08120000000',
  nama_member_2: 'tester 02',
  no_wa_2: '08130000000',
  nama_member_3: 'tester 03',
  no_wa_3: '08140000000'
}

for (let i=1; i <= 4; i++) {
  if (req_body[`nama_member_${i}`] && req_body[`nama_member_${i}`] !== '') {
    console.log({nama: req_body[`nama_member_${i}`], no_wa: req_body[`no_wa_${i}`]})
  }
}