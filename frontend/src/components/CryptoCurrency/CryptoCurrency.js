import React, { Component } from 'react'
import Loader from './../Loader/Loader';
import "./CryptoCurrency.css"
import Navbar from './../Navbar/Navbar';


export default class CryptoCurrency extends Component {        

    constructor(){
        super();
        this.state = {
            coins: [],
            offset:0,
            searchInput: '',
            totalContent: 0,
            loading: false
        }
    }
    handleInput=(event)=>{
        this.setState({searchInput : event.target.value})
        
    }

     async componentDidMount(){
        const { offset, searchInput } = this.state;
        let url=`https://api.coinranking.com/v2/coins?offset=${offset}&limit=20&search=${searchInput}`;
        
        let data1 = await fetch(url,{
            'x-access-token': 'coinranking6bb5d22ed67a52c94f2ce176e8243d7ac8a33e110dc155a4',
        },);
        
        if(!data1.ok){
            this.setState({offset: offset-20});
            throw new Error('You exceed API limit..! Try after some time.');
        }
        let parseData = await data1.json();
        this.setState({totalContent: parseData.data.stats.total-offset});
        this.setState({coins: parseData.data.coins})


        setTimeout(() => {
            this.setState({ loading: false });
          }, 2000);
    }

    async nextPage(){
        const { offset } = this.state;
        this.setState({offset: offset+20}, ()=>{
            if(offset <= 201){
                this.componentDidMount();
            }
            
        });

        
    }
    async previousPage(){
        const { offset } = this.state;
            this.setState({offset: offset-20}, ()=>{
                this.componentDidMount();
           
            });
    }

    
    handleSubmit = async (event) => {
        const {searchInput} = this.state;
        console.log(searchInput);
        event.preventDefault(); 
        
        this.componentDidMount();


      }; 
    
    
      

  render() {
      const { loading } = this.state;
    return (
        <>
        <Navbar isSignIn={true} isSignOut={true}/>
            {loading ? <Loader/> : <div className='container-fluid container' >
                <form  onSubmit={this.handleSubmit} className='d-flex mt-3'>
                    <input type="text" placeholder='Search' value={this.state.searchInput} onChange={this.handleInput}/>
                    <button type="submit" className='ms-2 p-1 btn btn-primary fw-semibold'>Submit</button>
                </form>             
                <table className='table   mt-3'>
                    <thead>
                        <tr>
                            <th scope="col">Rank</th>
                            <th scope="col">Coin</th>
                            <th scope="col">Price</th>
                            <th scope="col">24h changes</th>
                            {/* <th scope="col">Volumne (24h)</th> */}

                        </tr>
                    </thead>
                    <tbody id='data'>
                        {this.state.coins.map((element)=>{
                            return <tr className='table-row'>
                            
                                        <th scope='row'>{element.rank} </th>
                                        <td>
                                            <tr>
                                                <td className="col"><img src={element.iconUrl} alt="" /></td>
                                                <td><div className='d-flex flex-column ps-3'>
                                                        <span className='fw-bold'>{element.symbol} <br /></span>
                                                        <span className='fw-semibold'>{element.name}</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        </td>
                                        <td><p>$ {element.price = Math.round(element.price*100)/100}</p>  </td>
                                        <td className={element.change<0 ? 'text-danger' : 'text-success'}><p></p> {element.change===null ? "-": `${element.change}%` } </td>
                                        {/* <td>$ {element.volume} </td> */}
                                    </tr>
                        })}

                    </tbody>
                </table>  
           
                <div className='d-flex justify-content-between ' >
                    <button className={this.state.offset<20 ? "invisible" : "bg-primary p-2 border border-2 border-dark text-light"} onClick={()=>this.previousPage()} >◀ Previous</button>  
                    {this.state.totalContent>20 && <button className="bg-primary p-2 border border-2 border-dark text-light" onClick={()=>this.nextPage()}>next ▶</button> }

                </div>
                <div  >
                    {this.state.totalContent === 0 && <h2 className='text-center'>No Data Found</h2>}
                </div>
            </div>}
        </>
    )
  }
}

