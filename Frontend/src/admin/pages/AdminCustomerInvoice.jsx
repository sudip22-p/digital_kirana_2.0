import React from 'react'

const AdminCustomerInvoice = () => {
  return (
    <>
      <main>
        <h1>Invoice</h1>
        <section id="invoiceContent">
            <div class="invoice-heading">
                <img src="../Assets/Images/Icons/logo_single.png" alt="Digital Kirana Logo" />
                <span>Order <span id="orderId">#123456</span></span>
            </div>
            <hr />
            <div class="invoice-date-status">
                <p class="date-container">Date <span id="orderTime" class="order-date">2024-06-01</span></p>
                <span>Status <span id="orderStatus" class="status Processing">Processing</span></span>
            </div>
            <div class="customer-information">
                <div class="invoice-customer-details">
                    <h4>Customer Details</h4>
                    <span id="customerName" class="customer-name">John Doe</span>
                    <span class="customer-email">john.doe@example.com</span>
                    <span class="customer-number">+977 9876543210</span>
                </div>
                <div class="invoice-billing-address">
                    <h4>Billing Address</h4>
                    <p class="customer-billing-address">1234 Elm Street, Kathmandu</p>
                </div>
            </div>
            <div class="invoice-table-container">
                <table class="invoice-table">
                    <tr id="tableTitle">
                        <th class="sn">S.N</th>
                        <th>Product Title</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th class="amt">Amount</th>
                    </tr>
                    {/* <!-- items --> */}
                    <tr class="product-details">
                        <td class="sn-value">1</td>
                        <td class="product-name">Product A</td>
                        <td class="price-value">100</td>
                        <td class="quantity-value">2</td>
                        <td class="amount-value">200</td>
                    </tr>
                    <tr class="product-details">
                        <td class="sn-value">2</td>
                        <td class="product-name">Product B</td>
                        <td class="price-value">150</td>
                        <td class="quantity-value">1</td>
                        <td class="amount-value">150</td>
                    </tr>
                    {/* <!-- items --> */}
                </table>
            </div>
            <div class="invoice-amt-container">
                <table>
                    <tr class="delivery final-bill">
                        <th>Delivery Amount :</th>
                        <td>20</td>
                    </tr>
                    <tr class="total-amt final-bill">
                        <th>Total Amount :</th>
                        <td>370</td>
                    </tr>
                </table>
            </div>
        </section>
    </main>
    </>
  )
}

export default AdminCustomerInvoice
