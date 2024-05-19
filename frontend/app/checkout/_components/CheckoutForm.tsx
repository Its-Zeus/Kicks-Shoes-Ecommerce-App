import {useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';

const CheckoutForm = ({amount} : {amount: number}) => {
    const stripe = useStripe();
    const elements = useElements();
  
    const handleSubmit = async (event) => {
      // We don't want to let default form submission happen here,
      // which would refresh the page.
      event.preventDefault();
      
  
      if (!stripe || !elements) {
        // Stripe.js hasn't yet loaded.
        // Make sure to disable form submission until Stripe.js has loaded.
        return;
      }
      const submitBtn = document.getElementById('submit');
      const handleError = (error : any) => {
        const messageContainer = document.querySelector('#error-message');
        if (messageContainer && submitBtn) {
            messageContainer.textContent = error.message;
            submitBtn.disabled = false;
        }
      }

      const {error: submitError} = await elements.submit();
      if (submitError) {
        handleError(submitError);
        return;
      }
      const billingDetails = {
        firstname: event.target.firstname.value,
        lastname: event.target.lastname.value,
        email: event.target.email.value,
        phone: event.target.phone.value,
        address: event.target.address.value,
      };


      const res = await fetch('api/create-payment-intent', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({amount: amount,
        }),
      })
      const clientSecret = await res.json();
      const result = await stripe.confirmPayment({
        //`Elements` instance that was used to create the Payment Element
        clientSecret,
        elements,
        confirmParams: {
          return_url: "http://localhost:3000/cart",
        },
      });
      if (result.error) {
        // Show error to your customer (for example, payment details incomplete)
        console.log(result.error.message);
      } else {
        // Your customer will be redirected to your `return_url`. For some payment
        // methods like iDEAL, your customer will be redirected to an intermediate
        // site first to authorize the payment, then redirected to the `return_url`.
      }
    };
    const cardElementOptions = {
      style: {
        base: {
          fontSize: '16px',
          color: 'red',
          fontFamily: 'Arial, sans-serif',
          '::placeholder': {
            color: '#aab7c4',
          },
          backgroundColor: 'transparent', // Set background color to transparent
        },
        invalid: {
          color: '#fa755a',
        },
      },
    };
  return (
    <form onSubmit={handleSubmit}>
      <h1 className='text-2xl font-semibold'>Contact Details</h1>
      <p className=''>We will use these details to keep you inform about your delivery.</p>
      <input type="text" placeholder="Email" name='email' className='w-[49%] bg-transparent border-darkgrey rounded-lg my-6'/>
      <h1 className='text-2xl font-semibold mb-6'>Shipping Address</h1>
      <div className='flex justify-around gap-5'>
       <input type="text" placeholder="First Name" name='firstname' className='w-[50%] bg-transparent border-darkgrey rounded-lg my-6'/>
       <input type="text" placeholder="Last Name" name='lastname' className='w-[50%] bg-transparent border-darkgrey rounded-lg my-6'/>
      </div>
      <input type="text" placeholder="Delivery Address" name='address' className='w-full bg-transparent border-darkgrey rounded-lg'/>
      <input type="text" placeholder="Phone Number" name='phone' className='w-[49%] bg-transparent border-darkgrey rounded-lg my-6'/>
      <PaymentElement options={cardElementOptions} />
      <button id="submit" className='bg-darkgrey text-fawhite rounded-lg py-2 px-9 mt-5 uppercase'>Review and Pay</button>
    </form>
  );
};

export default CheckoutForm;