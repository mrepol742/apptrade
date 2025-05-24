<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $departments = [
            'HR',
            'IT',
            'Finance',
            'Marketing',
            'Sales',
            'Customer Service',
            'Operations',
            'Research and Development',
            'Legal',
            'Administration',
            'Logistics',
            'Public Relations',
            'Product Management',
            'Business Development',
            'Quality Assurance',
            'Training and Development',
            'Procurement',
            'Compliance',
        ];
        $groups = [
            'Eletronics',
            'Clothing',
            'Food',
            'Furniture',
            'Toys',
            'Books',
            'Sports',
            'Automotive',
            'Health',
            'Beauty',
            'Jewelry',
            'Gardening',
            'Pet Supplies',
        ];

        // User seeder
        for ($i = 0; $i < 30; $i++) {
            \App\Models\User::factory()->create([
                'name' => fake()->name(),
                'email' => fake()->unique()->safeEmail(),
                'phone' => fake()->phoneNumber(),
                'department_id' => rand(1, count($departments)),
                'address' => fake()->address(),
                'username' => fake()->userName(),
                'role' => fake()->randomElement(['super_admin', 'admin', 'cashier', 'production', 'material_control']),
                'status' => fake()->randomElement(['active', 'inactive']),
                'password' => bcrypt('password'),
            ]);
        }

        // Department seeder
        foreach ($departments as $department) {
            \App\Models\Department::factory()->create([
                'name' => $department,
            ]);
        }

        // Group seeder
        foreach ($groups as $group) {
            \App\Models\Group::factory()->create([
                'name' => $group,
                'description' => fake()->text(50),
            ]);
        }

        $batchSize = 1000;
        $total = 1000000;
        $products = [];

        for ($i = 0; $i < $total; $i++) {
            $products[] = [
                'department_id' => rand(1, count($departments)),
                'group_id' => rand(1, count($groups)),
                'barcode' => fake()->ean13(),
                'unit_measurement' => fake()->word(),
                'name' => fake()->word(),
                'description' => fake()->text(50),
                'cost_price' => rand(1, 100),
                'markup' => rand(1, 100),
                'sale_price' => rand(1, 100),
                'created_at' => now(),
                'updated_at' => now(),
            ];

            if (count($products) === $batchSize) {
                \App\Models\Product::insert($products);
                $products = [];
            }
        }

        // Insert any remaining products
        if (!empty($products)) {
            \App\Models\Product::insert($products);
        }
    }
}
