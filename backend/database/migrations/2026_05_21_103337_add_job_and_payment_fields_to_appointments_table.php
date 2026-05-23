<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('appointments', function (Blueprint $table) {
            if (!Schema::hasColumn('appointments', 'fabric_details')) {
                $table->text('fabric_details')->nullable()->after('status');
            }

            if (!Schema::hasColumn('appointments', 'design_preferences')) {
                $table->text('design_preferences')->nullable()->after('fabric_details');
            }

            if (!Schema::hasColumn('appointments', 'alteration_details')) {
                $table->text('alteration_details')->nullable()->after('design_preferences');
            }

            if (!Schema::hasColumn('appointments', 'payment_status')) {
                $table->string('payment_status')->default('pending')->after('alteration_details');
            }

            if (!Schema::hasColumn('appointments', 'refund_status')) {
                $table->string('refund_status')->nullable()->after('payment_status');
            }
        });
    }

    public function down(): void
    {
        Schema::table('appointments', function (Blueprint $table) {
            if (Schema::hasColumn('appointments', 'refund_status')) {
                $table->dropColumn('refund_status');
            }

            if (Schema::hasColumn('appointments', 'payment_status')) {
                $table->dropColumn('payment_status');
            }

            if (Schema::hasColumn('appointments', 'alteration_details')) {
                $table->dropColumn('alteration_details');
            }

            if (Schema::hasColumn('appointments', 'design_preferences')) {
                $table->dropColumn('design_preferences');
            }

            if (Schema::hasColumn('appointments', 'fabric_details')) {
                $table->dropColumn('fabric_details');
            }
        });
    }
};