import React,{useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import {db} from '../Firebase'
const TAX_RATE = 0.07;

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  button: {
    margin: theme.spacing(1),
  },
}));

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(key,desc, qty, unit) {
  const price = priceRow(qty, unit);
  return {key,desc, qty, unit, price };
}

function subtotal(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}
 
/*
const rows = [
  createRow('Paperclips (Box)', 100, 1.15),
  createRow('Paper (Case)', 10, 45.99),
  createRow('Waste Basket', 2, 17.99),
];*/

function readRowsForCart()
{let rows=[]
  for(let i=0;i<localStorage.length;i++)
  {if(localStorage.key(i).startsWith("CT_V_"))
  { let items=JSON.parse(localStorage.getItem(localStorage.key(i)))
    let row=createRow(localStorage.key(i),items.videotitle,1.0,items.amount)
    rows.push(row)


  }
  }
  return rows
}











export default function SpanningTable(props) {
    const [xy,sxy]=React.useState(0)
  const classes = useStyles();
   let rows=readRowsForCart()
   const invoiceSubtotal = subtotal(rows);
const invoiceTaxes = TAX_RATE * invoiceSubtotal;
const invoiceTotal = invoiceTaxes + invoiceSubtotal;
   const [stateView, setStateView] = React.useState('');        
   const handleRemove=(key)=>{
     localStorage.removeItem(key)
     props.countCartItems()
     setStateView('RemoveCart')
  
   }
   function handleShopping()
   {
    props.setViews("CATEGORY",'') 
   }
   function clearCartItems()
{ let c=0
  for(let i=localStorage.length-1;i>=0;i--)
  { let value=localStorage.key(i)
    if(value.startsWith('CT_V_'))
    {localStorage.removeItem(value)}

  }
  sxy(1)
  props.countCartItems()
}
   async function handlePayment()
   {   let user= JSON.parse(localStorage.getItem('US_USER'))
        let rows=readRowsForCart()
        console.log(user,rows);
       try{await db.collection('paymentrequest').doc().set({date:new Date(),email:user.emailid,items:rows.length,
        info: JSON.stringify(rows)})
       await db.collection('user').doc(user.emailid).collection('requests').doc().set(
        {date:new Date(),status:'applied',items:rows.length,info: JSON.stringify(rows)}
       )}catch(e){
           console.log(e.message);
       }
       clearCartItems()
   }
  return (
    (rows.length!=0)?(
    <div>
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
          <TableCell>Remove</TableCell>
         
            <TableCell>Desc</TableCell>
            <TableCell align="right">Qty.</TableCell>
            <TableCell align="right">@</TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

          {rows.map(row => (
            <TableRow key={row.desc}>
               <TableCell><DeleteOutlinedIcon onClick={()=>handleRemove(row.key)}/></TableCell>
              <TableCell>{row.desc}</TableCell>
              <TableCell align="right">{row.qty}</TableCell>
              <TableCell align="right">{row.unit}</TableCell>
              <TableCell align="right">{ccyFormat(row.price)}</TableCell>
            </TableRow>
          ))}

          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={2}>Subtotal</TableCell>
            <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Tax</TableCell>
            <TableCell align="right">{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
            <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
     
    </Paper>
    <div>
       <Button variant="contained"  onClick={handleShopping} color="primary" className={classes.button}>
       Continue Shopping...
      </Button>
      <Button variant="contained" color="secondary"  onClick={handlePayment} className={classes.button}>
      pay to admin by upi or cash and post a request 
      </Button>
      </div>
    </div>):(<div>   <Button variant="contained"  onClick={handleShopping} color="primary" className={classes.button}>
       Continue Shopping... {xy==1? 'your request is placed if admin recieved payment then ur order will be placed':''}
      </Button>
    Cart is Empty</div>)
    

  );
}