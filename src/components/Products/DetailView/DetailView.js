import React, { useContext } from 'react';
import Colors from '../../Products/DetailView/Colors';
import DetailsThumb from './DetailsThumb';
import Rating from '@material-ui/lab/Rating';
import './DetailView.css';
import { products } from '../../utilities/json';
import { AppContext } from '../../../AppContext';
import { Close } from '@material-ui/icons';

const DetailView = () => {

  const { isModelOpen, toggleModelState } = useContext(AppContext); 

    // const [state, setState] = useState(products);

    // const myRef = useRef();

    // const handleTab = index =>{
    //     setState({index: index})
    //     const images = this.myRef.current.children;
    //     for(let i=0; i<images.length; i++){
    //       images[i].className = images[i].className.replace("active", "");
    //     }
    //     images[index].className = "active";
    //   };

    // useEffect(() => {
    //     const {index} = setState;
    //     myRef.current.children.className = 'active';
    // })

    return (
        <div className={`modal modalShow-${isModelOpen}`}>
        { products.details.map((item, index) => (
             <div className="detailss" key={item._id}>
               <Close className="close" onClick={() => toggleModelState()}/>
             <div className="big-img">
               <img src={item.src[index]} alt=""/>
             </div>

             <div className="box">
               <div className="row">
                 <h2>{item.title}</h2>
                 <span>${item.price}</span>
               </div>
               <Rating name="read-only" value={3.5} readOnly precision={0.5}/>
               <Colors colors={item.colors} />

               <p>{item.description}</p>
               <p>{item.content}</p>

               <DetailsThumb images={item.src} />
               <button className="cart">Visit Site</button>

             </div>
           </div>
        ))}

        </div>
    )
}

export default DetailView
