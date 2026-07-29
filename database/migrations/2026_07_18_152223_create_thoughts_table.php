<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('thoughts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->cascadeOnDelete();
            $table->text('message');
            $table->enum('type', ['achievement', 'post', 'duel', 'protest', 'event']);
            $table->integer('likes')->default(0);
            $table->integer('comments')->default(0);
            $table->boolean('liked')->default(false);
            $table->boolean('saved')->default(false);
            $table->boolean('anon')->default(false);
            $table->string('tag')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('thoughts');
    }
};
