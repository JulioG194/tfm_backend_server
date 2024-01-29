
export const PersonBuilder: any = (personInput:any) => {
    return { 
    id: personInput.id, 
    email: personInput.email, 
    name: personInput.name ?? '', 
    surname: personInput.surname ?? '', 
    address: personInput.address ?? '',
    city: personInput.city ?? '',
    description: personInput.description ?? '',
    employment: personInput.employment ?? '',
    phoneNumber: personInput.phoneNumber ?? '',
    province: personInput.province ?? '',
    postalCode: personInput.postalCode ?? '',
    sex: personInput.sex ?? '',
    avatar: personInput.avatar ?? '',
  }
}
    