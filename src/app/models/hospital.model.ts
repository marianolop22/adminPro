export class Hospital {

    constructor (
        public nombre: string,
        public img?: string,
        public _id?: string
    ) { }

    getNombre () {
        return this.nombre;
    }

    setNombre ( nombre:string ) {
        this.nombre = nombre;

    }



}
