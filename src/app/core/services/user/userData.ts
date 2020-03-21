export interface AWSUserData {
    attributes: AWSUserAttribute[]
    username: string
}

export interface AWSUserAttribute {
    name: string
    value: string
}