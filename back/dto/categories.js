class Category {
    constructor(key, value) {
      this.key = key; 
      this.value = value;
    }
}

//module.exports = Category;
/*
module.exports = () => {
    const categories = {};
    categories['SERVICO_DOMESTICO'] = 'Serviços domésticos';
    categories['SERVICO_GERAL'] = 'Serviços gerais';
    categories['SERVICO_DOMICILIAR'] = 'Serviço domiciliar';
    categories['ALIMENTACAO'] = 'Alimentação';
    categories['CONSTRUCAO'] = 'Construção';
    categories['EDUCACAO'] = 'Educação';
    categories['OUTRO'] = 'Outro';
    return categories
};*/

module.exports = () => {
    const categories = [];
    categories.push(new Category('SERVICO_DOMESTICO', 'Serviços domésticos'));
    categories.push(new Category('SERVICO_GERAL', 'Serviços gerais'));
    categories.push(new Category('SERVICO_DOMICILIAR', 'Serviço domiciliar'));
    categories.push(new Category('ALIMENTACAO', 'Alimentação'));
    categories.push(new Category('CONSTRUCAO', 'Construção'));
    categories.push(new Category('EDUCACAO', 'Educação'));
    categories.push(new Category('OUTRO', 'Outro'));
    return categories
};