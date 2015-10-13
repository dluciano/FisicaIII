var Core = function() {
};

Core.prototype.calcularCampoElectrico = function() {
};

function Magnitud(valor, unidad){
    var self = this;
    self.valor = valor;
    self.unidad = unidad;
    return self;
}

var Dimensiones = {
    longitud: "L",
    masa: "M",
    tiempo: "T",
    intensidadCorriente: "A"
};

function Unidad(nombre, dimension, simbolo){
    var self = this;
    self.nombre = nombre;
    self.dimension = dimension;
    self.sistema = {};
    self.simbolo = simbolo;
    return self;
}

function UnidadDerivada(nombre, unidadesNumerador, unidadesDenominador, simbolo){
    var self = this;
    self.nombre = nombre;
    self.unidadesNumerador = unidadesNumerador;
    self.unidadesDenominador = unidadesDenominador;
    self.simbolo = simbolo;
    self.sistema = {}
    return self;
}

function Prefijo(nombre, simbolo, exponente, base){
    var self = this;
    self.nombre = nombre;
    self.simbolo = simbolo;
    self.exponente = exponente;
    self.sistema = {};
    self.base = base === undefined ? 10 : base;
}

function SistemaMedida(nombre){
    var self = this;
    self.nombre = nombre;
    self.unidades = [];
    self.unidadesDerivadas = [];
    self.prefijos = [];
    
    self.agregarUnidad = function(unidad){
        unidad.sistema = self;
        self.unidades.push(unidad);
        return self;
    };
    
    self.agregarUnidadDerivada = function(unidad){
        unidad.sistema = self;
        self.unidadesDerivadas.push(unidad);
        return self;
    };
    
    self.agregarPrefijo = function(prefijo){
        prefijo.sistema = self;
        self.prefijos.push(prefijo);
        return self;
    };
    
    return self;
}

function RepositorioUnidades(){
    var self = this;
    
    self.sistemas = [];
    
    var amperio = new Unidad("amperio", Dimensiones.intensidadCorriente, "A");
    var segundo = new Unidad("segundo", Dimensiones.tiempo, "s");
    var si = new SistemaMedida("internacional")
            .agregarUnidad(new Unidad("metro", Dimensiones.longitud, "m"))
            .agregarUnidad(new Unidad("kilogramo", Dimensiones.masa, "Kg"))
            .agregarUnidad(segundo)
            .agregarUnidad(amperio);
    
    self.sistemas.push(si);
    
    si.agregarUnidadDerivada(new UnidadDerivada("culombio", [amperio, segundo],null,"C"));

    si.agregarPrefijo(new Prefijo("deca", "da", 1));
    si.agregarPrefijo(new Prefijo("hecto", "h", 2));
    si.agregarPrefijo(new Prefijo("kilo", "k", 3));
    si.agregarPrefijo(new Prefijo("mega", "M", 6));
    si.agregarPrefijo(new Prefijo("giga","G", 9));
    si.agregarPrefijo(new Prefijo("tera","T", 12));
    si.agregarPrefijo(new Prefijo("peta","P", 15));
    si.agregarPrefijo(new Prefijo("exa","E", 18));
    si.agregarPrefijo(new Prefijo("zetta","Z", 21));
    si.agregarPrefijo(new Prefijo("yotta","Y", 24));
        
    //IS THIS NECCESSARY?
    si.agregarPrefijo(new Prefijo("unidad","", 0));
    //----
    
    si.agregarPrefijo(new Prefijo("deci", "d", -1));
    si.agregarPrefijo(new Prefijo("centi", "c", -2));
    si.agregarPrefijo(new Prefijo("mili", "m", -3));
    si.agregarPrefijo(new Prefijo("micro", "µ", -6));
    si.agregarPrefijo(new Prefijo("nano", "n", -9));
    si.agregarPrefijo(new Prefijo("pico", "p", -12));
    si.agregarPrefijo(new Prefijo("femto", "f", -15));
    si.agregarPrefijo(new Prefijo("atto", "a", -18));
    
    return self;
}

function UnidadesVM(unidad, prefijos){
    var self = this;
    self.unidad = unidad;
    self.opciones = [];
    $(prefijos).each(function(i, p){
        self.opciones.push(new Option(p.simbolo + self.unidad.simbolo, p.exponente, p.exponente === 0));
    });
    return self;
}

function UnidadComponente(si, element){
    var self = this;
    self.element = element;
    var vm = {};
    //SHIT...
    try {
        vm = new UnidadesVM(Enumerable.From(si.unidades).Single(function(unid){
            return unid.nombre == $(self.element).data("unidad");
        }), si.prefijos);
    } catch (e) {
        try {
            vm = new UnidadesVM(Enumerable.From(si.unidadesDerivadas).Single(function(unid){
                return unid.nombre == $(self.element).data("unidad");
            }), si.prefijos);
        } catch (e) {
            throw e;
        }
    }//----SHITT...
    $(vm.opciones).each(function(i, o){
        $(self.element).append($(o));
    });
    return self;
}
