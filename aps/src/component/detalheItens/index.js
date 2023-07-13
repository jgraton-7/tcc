import { useParams } from 'react-router-dom';

const DetalhesItem = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Detalhes do Item</h1>
      <h1>item</h1>
    </div>
  );
};

export default DetalhesItem;