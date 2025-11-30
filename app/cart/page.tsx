"use client";

import Link from "next/link";
import { useBuilderStore } from "@/lib/store/builderStore";
import { Button } from "@/components/atoms/Button";
import { Card, CardContent } from "@/components/molecules/Card";
import { Trash2, ShoppingBag, MessageCircle } from "lucide-react";
import { formatPrice } from "@/lib/utils";

// WhatsApp Phone Number Configuration
const WA_PHONE_NUMBER = "905362963962";

export default function CartPage() {
  const cart = useBuilderStore((state) => state.cart);
  const removeFromCart = useBuilderStore((state) => state.removeFromCart);

  const grandTotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);

  const handleCheckout = () => {
    // Build order message for each item
    const orderMessages = cart.map((item) => {
      const charmNames =
        item.charms.length > 0
          ? item.charms.map((charm) => charm.name).join(", ")
          : "Charm eklenmedi";
      return `${item.chain.name} + ${charmNames}`;
    });

    const orderDetails = orderMessages.join("\n");

    // Format the Turkish message
    const message = `Merhaba! Web sitenizden sipariş vermek istiyorum.

📦 Sipariş: ${orderDetails}

💰 Tutar: ${grandTotal.toFixed(2)} TL`;

    // Encode the message
    const encodedMessage = encodeURIComponent(message);

    // Open WhatsApp in a new tab
    window.open(
      `https://wa.me/${WA_PHONE_NUMBER}?text=${encodedMessage}`,
      "_blank"
    );
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <div className="mb-8">
            <ShoppingBag className="h-24 w-24 mx-auto text-gray-300 mb-4" />
            <h1 className="font-display text-3xl font-bold mb-2 text-gray-900">
              Your cart is empty
            </h1>
            <p className="text-gray-600 mb-8">
              Start building your perfect charm necklace
            </p>
          </div>
          <Link href="/builder">
            <Button variant="primary" size="lg">
              Start Designing
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="font-display text-4xl font-bold mb-2 text-gray-900">
          Shopping Cart
        </h1>
        <p className="text-gray-600">
          {cart.length} {cart.length === 1 ? "item" : "items"} in your cart
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <div className="flex flex-col sm:flex-row">
                {/* Chain Preview */}
                <div className="w-full sm:w-32 h-32 bg-gray-50 flex items-center justify-center p-4">
                  <img
                    src={item.chain.image}
                    alt={item.chain.name}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Item Details */}
                <div className="flex-1 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-display text-xl font-semibold mb-2 text-gray-900">
                        {item.chain.name} Necklace
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        Chain: {item.chain.name}
                      </p>
                      {item.charms.length > 0 ? (
                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-1">
                            Charms ({item.charms.length}):
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {item.charms.map((charm, index) => (
                              <span
                                key={charm.id}
                                className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                              >
                                {charm.name}
                                {index < item.charms.length - 1 && ","}
                              </span>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500">No charms added</p>
                      )}
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-2"
                      aria-label="Remove item"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="font-display text-2xl font-bold text-gray-900">
                      {formatPrice(item.totalPrice)}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardContent className="p-6">
              <h2 className="font-display text-2xl font-semibold mb-6 text-gray-900">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>
                    Subtotal ({cart.length} {cart.length === 1 ? "item" : "items"})
                  </span>
                  <span>{formatPrice(grandTotal)}</span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-900">Total</span>
                    <span className="font-display text-2xl font-bold text-gray-900">
                      {formatPrice(grandTotal)}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 mb-4"
              >
                <MessageCircle className="h-5 w-5" />
                Siparişi WhatsApp ile Tamamla
              </button>

              <Link href="/builder">
                <Button variant="outline" size="lg" className="w-full">
                  Continue Shopping
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
