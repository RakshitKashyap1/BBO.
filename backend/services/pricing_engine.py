"""
File: services/pricing_engine.py
Description: The "Secret Sauce" of BBO. Calculates dynamic pricing for billboards
based on duration, location, demand, and seasonal factors.
"""

from datetime import timedelta

def calculate_price(adspace, start_date, end_date):
    """
    Main Pricing Algorithm:
    - Inputs: AdSpace object, start date, end date.
    - Logic: Base Price * Multipliers + Fixed Costs + Platform Fees.
    - Returns: Breakdown dictionary of costs and final price.
    """
    
    # 1. Calculate Campaign Duration
    duration = (end_date - start_date).days
    if duration <= 0:
        duration = 1  # Minimum 1 day fallback
    
    # 2. Baseline Calculation
    # Convert DecimalField from DB to float for arithmetic
    base_cost = float(adspace.base_price_per_day) * duration

    # 3. Fixed Logistics Costs
    printing_cost = 500.00  # Standard canvas printing cost
    labour_cost = 300.00    # Installation and mounting labor
    platform_fee = base_cost * 0.05 # 5% BBO. platform service fee

    # 4. Multipliers (The "Startup" Sauce)
    
    # High Traffic Premium: 20% extra if footfall > 10k
    demand_multiplier = 1.2 if adspace.footfall_estimate > 10000 else 1.0

    # Seasonal Surge: +30% for Holiday months (Nov/Dec)
    if start_date.month in [11, 12]:
        demand_multiplier += 0.3
        
    # Geographic Premium: +50% for high-demand cities like Mumbai
    if adspace.city == "Mumbai":
        demand_multiplier += 0.5
        
    # Bulk campaign discount: 10% off base cost if staying > 30 days
    if duration > 30:
        base_cost *= 0.9

    # 5. Final Aggregation
    # Final = (Adjusted Base * Total Multipliers) + Fixed Overheads
    final_price = (base_cost * demand_multiplier) + printing_cost + labour_cost + platform_fee

    return {
        "duration": duration,
        "base_cost": base_cost,
        "printing_cost": printing_cost,
        "labour_cost": labour_cost,
        "platform_fee": platform_fee,
        "demand_multiplier": demand_multiplier,
        "final_price": round(final_price, 2)
    }
