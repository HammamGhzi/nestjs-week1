export class Member {
    id: number;
    name: string
    email: string;
    phone: string;
    password: string;
}

export type PublicMember = Omit<Member, 'password'>;
