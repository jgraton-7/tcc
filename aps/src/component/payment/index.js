import './index.css'


function Payment(){
    return(
        <div>

            <select name="Tomada">
                <option value="valor1">Valor 1</option>
                <option value="valor2">Valor 2</option>
                <option value="valor3">Valor 3</option>
            </select>

            <select name="Eletronico para comparação">
                <option value="valor1">Valor 1</option>
                <option value="valor2">Valor 2</option>
                <option value="valor3">Valor 3</option>
            </select>
        </div>
    );
}

export default Payment;