import { Component } from '@angular/core';
import { ProductModel } from '../../models/ProductModel';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-product',
  imports: [
    CommonModule,
    RouterLink,
    CurrencyPipe,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class Product {
  produtList: ProductModel[] = [
    {
      id: 1,
      name: 'Smartphone',
      price: 1250.5,
      imageUrl: 'https://placehold.co/300x200/EBD8B2/000000?text=Smartphone',
      description: 'Latest model with advanced features.',
    },
    {
      id: 2,
      name: 'Laptop',
      price: 2500.0,
      imageUrl: 'https://placehold.co/300x200/E4A5A5/000000?text=Laptop',
      description: 'Powerful and lightweight for professionals.',
    },
    {
      id: 3,
      name: 'Headphones',
      price: 350.75,
      imageUrl: 'https://placehold.co/300x200/A5E4E4/000000?text=Headphones',
      description: 'Noise-cancelling with superior sound quality.',
    },
    {
      id: 4,
      name: 'Smartwatch',
      price: 850.0,
      imageUrl: 'https://placehold.co/300x200/D8B2EB/000000?text=Smartwatch',
      description: 'Track your fitness and stay connected.',
    },
    {
      id: 5,
      name: 'Camera',
      price: 1800.2,
      imageUrl: 'https://placehold.co/300x200/B2EBD8/000000?text=Camera',
      description: 'Capture stunning photos and videos.',
    },
    {
      id: 6,
      name: 'Tablet',
      price: 1100.0,
      imageUrl: 'https://placehold.co/300x200/F2E1A6/000000?text=Tablet',
      description: 'Perfect balance of portability and performance.',
    },
    {
      id: 7,
      name: 'Bluetooth Speaker',
      price: 280.99,
      imageUrl: 'https://placehold.co/300x200/A6E1F2/000000?text=Speaker',
      description: 'Compact design with deep bass sound.',
    },
    {
      id: 8,
      name: 'Gaming Console',
      price: 3200.0,
      imageUrl: 'https://placehold.co/300x200/F2B6A6/000000?text=Console',
      description: 'Next-gen console with 4K gaming support.',
    },
    {
      id: 9,
      name: 'Wireless Mouse',
      price: 120.45,
      imageUrl: 'https://placehold.co/300x200/C8E4B2/000000?text=Mouse',
      description: 'Ergonomic design with long battery life.',
    },
    {
      id: 10,
      name: 'Mechanical Keyboard',
      price: 420.0,
      imageUrl: 'https://placehold.co/300x200/D1B2EB/000000?text=Keyboard',
      description: 'RGB lighting and tactile switches for gamers.',
    },
    {
      id: 11,
      name: 'Monitor 27"',
      price: 1350.0,
      imageUrl: 'https://placehold.co/300x200/B2D8EB/000000?text=Monitor',
      description: 'High refresh rate and vivid color display.',
    },
    {
      id: 12,
      name: 'External Hard Drive',
      price: 480.9,
      imageUrl: 'https://placehold.co/300x200/F2D2B6/000000?text=HDD',
      description: '1TB storage for backups and media files.',
    },
    {
      id: 13,
      name: 'Power Bank',
      price: 199.99,
      imageUrl: 'https://placehold.co/300x200/B2EBD0/000000?text=Power+Bank',
      description: 'Charge your devices anywhere on the go.',
    },
    {
      id: 14,
      name: 'Smart TV 50"',
      price: 2950.0,
      imageUrl: 'https://placehold.co/300x200/EBAFB2/000000?text=Smart+TV',
      description: 'Ultra HD with integrated streaming apps.',
    },
    {
      id: 15,
      name: 'Drone',
      price: 2100.0,
      imageUrl: 'https://placehold.co/300x200/AFB2EB/000000?text=Drone',
      description: 'Capture aerial photos with 4K resolution.',
    },
    {
      id: 16,
      name: 'VR Headset',
      price: 1850.0,
      imageUrl: 'https://placehold.co/300x200/EBD8F2/000000?text=VR+Headset',
      description: 'Immersive virtual reality experience.',
    },
    {
      id: 17,
      name: 'Smart Home Hub',
      price: 690.0,
      imageUrl: 'https://placehold.co/300x200/B2EBE4/000000?text=Smart+Hub',
      description: 'Control your smart devices in one place.',
    },
    {
      id: 18,
      name: 'Electric Scooter',
      price: 3100.0,
      imageUrl: 'https://placehold.co/300x200/EBD2A6/000000?text=Scooter',
      description: 'Eco-friendly urban transportation.',
    },
    {
      id: 19,
      name: 'Portable Projector',
      price: 980.5,
      imageUrl: 'https://placehold.co/300x200/C9EBAF/000000?text=Projector',
      description: 'Compact projector for movies anywhere.',
    },
    {
      id: 20,
      name: 'Smart Lamp',
      price: 260.0,
      imageUrl: 'https://placehold.co/300x200/EBC7B2/000000?text=Smart+Lamp',
      description: 'Adjust brightness and color via app.',
    },
    {
      id: 21,
      name: 'Router Wi-Fi 6',
      price: 720.0,
      imageUrl: 'https://placehold.co/300x200/B2BEEB/000000?text=Router',
      description: 'High-speed internet for multiple devices.',
    },
    {
      id: 22,
      name: 'Action Camera',
      price: 890.0,
      imageUrl: 'https://placehold.co/300x200/EBD8B2/000000?text=Action+Cam',
      description: 'Compact and waterproof for adventures.',
    },
    {
      id: 23,
      name: 'Fitness Tracker',
      price: 350.0,
      imageUrl: 'https://placehold.co/300x200/B2EBB2/000000?text=Fitness+Tracker',
      description: 'Monitor your health and daily activity.',
    },
    {
      id: 24,
      name: 'Gaming Chair',
      price: 1250.0,
      imageUrl: 'https://placehold.co/300x200/D8B2B2/000000?text=Gaming+Chair',
      description: 'Ergonomic comfort for long gaming sessions.',
    },
    {
      id: 25,
      name: 'Wireless Charger',
      price: 180.0,
      imageUrl: 'https://placehold.co/300x200/B2EBD8/000000?text=Wireless+Charger',
      description: 'Fast and convenient charging pad.',
    },
  ];
}
