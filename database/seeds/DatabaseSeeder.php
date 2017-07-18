<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call(Logistic_TypesTableSeeder::class);
        $this->call(Order_StatusesTableSeeder::class);
    }
}
