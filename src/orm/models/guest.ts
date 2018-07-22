import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Guest {

    constructor(name:string, number:string) {
        this.number = number;
        this.name = name;
    }
    
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column()
    number:string;

    @Column({ default: '1' })
    invited_count:string;
    
    @Column({ nullable: true })
    rsvp_count:string;
}