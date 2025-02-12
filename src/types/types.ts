import { Document, Types } from "mongoose"

//Class interface
export interface IClass  extends Document{
    name:string
    forSchool:Types.ObjectId
    subjects: Types.ObjectId []
    streams: Types.ObjectId []
}

//Configuration interface
export interface IConfig {

}

export interface ILearner {
    userDetails: Types.ObjectId
    class: Types.ObjectId
    forSchool: Types.ObjectId
}

export interface IParent {
    userDetails: Types.ObjectId
    forLearner: Types.ObjectId
    forSchool: Types.ObjectId
}

type EducationLevels = 'nursery' | 'primary' | 'secondary' | 'tertiary' | 'other'

export interface ISchool {
    name:string
    logo:string
    address:string
    contactEmail:string,
    yearOfEstablishment:number
    schoolType:'private' | 'government' | 'NGO' | 'other'
    educationLevels: EducationLevels | EducationLevels[]
    phoneNumbers: [string]
    otherInfo:object
}

export interface IStream {
    name:string
    forSchool:Types.ObjectId
}

export interface ISubject {
    name:string,
    forSchool:Types.ObjectId
}

export interface ITeacher {
    userDetails:Types.ObjectId
    classes: Types.ObjectId []
    subjects: Types.ObjectId []
    forSchool: Types.ObjectId
}


export interface ITerm {
    name:string
    forSchool:Types.ObjectId
}

export interface IUser {
    firstName: string
    lastName:string
    otherNames?:string
    password?:string
    isAdmin: boolean
    email:string
    forSchool: Types.ObjectId
}

export interface IAdmin  extends Document{
    firstName: string
    lastName: string
    email:string
    phoneNumber:string
    password:string
    avatar:string
    userName: string
}