# Concept Note: Implementing Road Pricing in Dhaka to Reduce Congestion and Promote Efficient Road Use

## Introduction
Dhaka, one of the world's most densely populated cities, faces severe traffic congestion that wastes time, increases pollution, and hampers economic growth. With millions of vehicles competing for limited road space, average speeds have dropped to around 6-15 km/h in many areas. Road pricing is a system where drivers pay fees based on when, where, and how they use the roads. This encourages efficient travel, reduces unnecessary trips, and generates revenue for better public transport. Unlike traditional vehicle taxes paid regardless of use, road pricing focuses on actual road usage—charging for the space and time vehicles occupy on public roads. This concept note outlines a hypothetical road pricing scheme for Dhaka, tailored to local vehicle types, zones, and times, while exempting licensed emergency vehicles (e.g., ambulances, fire trucks, police) at no cost.

## Zoning and Timing in Dhaka
To make pricing fair and targeted, divide Dhaka into three traffic zones based on congestion levels, drawing from the city's structure plan that segments areas for transport planning (e.g., central, inner, and outer zones). Zones reflect high-density business districts, residential areas, and peripherals:

- **Zone A (Core/High Congestion)**: Central business districts like Motijheel, Paltan, and Old Dhaka—where traffic is densest due to offices, markets, and narrow streets.
- **Zone B (Mid/Moderate Congestion)**: Inner areas like Gulshan, Dhanmondi, Banani, and Karwan Bazar—mixed residential and commercial with frequent bottlenecks.
- **Zone C (Peripheral/Low Congestion)**: Outer suburbs like Mirpur, Uttara, and Savar—wider roads but growing traffic from commuters.

Pricing varies by time of day to target peak hours when congestion peaks:

- **Peak Hours**: 7:00 AM - 10:00 AM and 5:00 PM - 8:00 PM (high demand from work/school commutes).
- **Off-Peak Hours**: 10:00 AM - 5:00 PM and 8:00 PM - 10:00 PM (moderate demand).
- **Night Hours**: 10:00 PM - 7:00 AM (low demand, minimal charges).

Fees apply when entering or traveling within a zone, detected via simple passes checked at tollgates. Revenue could fund metro expansions, bus fleets, or road maintenance.

## Charging for Roads, Not Vehicles: A Simple Explanation
Traditional systems tax vehicles based on ownership—like annual registration fees—whether you drive daily or rarely. This doesn't discourage wasteful road use. Instead, Dhaka authorities should charge for *roads* like a utility bill: pay for what you consume. Think of it as electricity—you pay per unit used, not for owning a light bulb. In road pricing:

- Fees depend on the distance traveled, zone entered, and time of day.
- Larger or slower vehicles pay more because they occupy more road space for longer, blocking others.
- This shifts focus from "owning a vehicle" to "using the road responsibly," rewarding efficient choices like carpooling or public transport.

For example, a car idling in traffic wastes road space for everyone, so it pays a fee proportional to its impact. Buses, carrying dozens, use space efficiently per person, so their per-vehicle fee is balanced but lower per passenger.

## Vehicle Types and Price Factors
Dhaka's traffic includes diverse vehicles: from small rickshaws to large trucks. Pricing factors in two key elements:
- **Road Area Occupied**: Approximate size (length x width, including driver/rider space) in square meters. Larger vehicles block more lane space.
- **Speed**: Average operating speed in km/h. Slower vehicles occupy road space longer, increasing congestion.

A base fee (e.g., 10 Taka per km in Zone A during peak) is multiplied by a "price factor" = (area occupied / 5) x (20 / speed). This formula penalizes big, slow vehicles while favoring compact, faster ones. (Numbers are illustrative; actual calibration needed via studies.)

The table below summarizes vehicle types, their estimated area (based on typical dimensions in Dhaka), average speed (from local traffic data), and resulting price factor. Charges are per km traveled in the zone/time.

| Vehicle Type     | Description                  | Est. Area Occupied (sq m, incl. driver/rider) | Avg. Speed (km/h) | Price Factor | Peak Charge (Taka/km, Zone A/B/C) | Off-Peak Charge (Taka/km, Zone A/B/C) | Night Charge (Taka/km, Zone A/B/C) |
|------------------|------------------------------|-----------------------------------------------|-------------------|--------------|-----------------------------------|---------------------------------------|------------------------------------|
| Cycles (Bicycles) | Pedal-powered, single rider | 1.5                                          | 10                | 0.6         | 6 / 4 / 2                        | 3 / 2 / 1                            | 1 / 0.5 / 0                       |
| Rickshaws        | Cycle rickshaws, 1-3 people | 2.5                                          | 8                 | 1.3         | 13 / 9 / 5                       | 7 / 5 / 3                            | 2 / 1 / 0                         |
| CNGs (Auto-rickshaws) | Three-wheelers, 1-4 people | 3.0                                          | 15                | 0.8         | 8 / 6 / 3                        | 4 / 3 / 2                            | 1 / 0.5 / 0                       |
| Motorbikes       | Two-wheelers, 1-2 people    | 2.0                                          | 20                | 0.4         | 4 / 3 / 2                        | 2 / 1.5 / 1                          | 0.5 / 0 / 0                       |
| Cars             | Sedans/SUVs, 1-5 people     | 8.0                                          | 12                | 2.7         | 27 / 19 / 14                     | 14 / 10 / 7                          | 5 / 3 / 1                         |
| Trucks           | Light/medium/heavy, cargo   | 15.0                                         | 10                | 6.0         | 60 / 42 / 30                     | 30 / 21 / 15                         | 10 / 7 / 3                        |
| Buses            | Mini/large, 20-80 people    | 20.0                                         | 10                | 8.0         | 80 / 56 / 40                     | 40 / 28 / 20                         | 15 / 10 / 5                       |

*Notes: Base fee is 10 Taka/km in Zone A peak; reduced by 30% in Zone B, 50% in Zone C. Off-peak is 50% of peak; night is 20%. Licensed emergency vehicles: 0 Taka across all. Factors derived from PCU equivalents and Dhaka-specific data (e.g., buses at 3-4 PCU, cars at 1).*

## Promoting Efficiency: Penalizing Inefficient Use
To encourage efficient road use, add incentives/penalties based on occupancy (passengers per vehicle). This targets vehicles that waste space, like empty cars in crowded zones.

- **Efficient Use Reward**: Vehicles with high occupancy get discounts. E.g., buses (high passengers) already have a built-in efficiency, but cars with 3+ passengers get 50% off their fee.
- **Inefficiency Penalty**: Cars with 1 or 0 passengers pay a 50% surcharge. Why? A solo driver in a car occupies space for 4-5 people but carries only one, worsening congestion for everyone.

**Example**: During peak in Zone A, a car (base 27 Taka/km) with 4 passengers (carpool) pays 13.5 Taka/km—efficient and cheap. But a solo driver pays 40.5 Taka/km—penalized for inefficiency. Meanwhile, a full CNG (4 people) pays just 8 Taka/km total, or 2 Taka per person—far better than the solo car at 40.5 Taka. This pushes people toward sharing rides, buses, or smaller vehicles, freeing space for essential travel. Over time, it could cut Dhaka's car dominance (28% of vehicles but low passengers) and boost buses (2% of vehicles but 49% passengers).

## Stepwise Introduction with Area Tollgates
To ensure smooth adoption and minimize disruption, introduce road pricing in phases, starting small and expanding based on feedback and results. Use physical area tollgates at key entry points instead of advanced technology, making it simple and low-cost to implement. Drivers purchase passes (day, week, month, or year) for access to priced areas, displayed as stickers or cards checked by attendants at tollgates. This approach builds on existing toll systems like those on highways, avoiding the need for GPS or cameras initially.

### Phase 1: Pilot in Gulshan and Banani (Year 1)
- **Focus Areas**: Start in affluent, high-congestion neighborhoods within Zone B, like Gulshan and Banani, known for heavy private car use and office traffic. These areas have clear boundaries with major roads (e.g., Gulshan Avenue, Banani Road 11) for easy tollgate setup.
- **Tollgates**: Install 4-6 manual tollgates at main entry points (e.g., from Mohakhali, Airport Road). Attendants check passes or collect fees on-site for non-pass holders.
- **Pass System**: 
  - Day Pass: 50-100 Taka (depending on vehicle type), valid for 24 hours.
  - Week Pass: 200-400 Taka, for frequent commuters.
  - Month Pass: 800-1,500 Taka, ideal for residents or daily workers.
  - Year Pass: 8,000-15,000 Taka, for long-term users with discounts.
- **Exemptions and Adjustments**: Residents get subsidized passes (e.g., 50% off monthly/yearly). Emergency vehicles pass free. Monitor traffic reduction (aim for 10-20% drop in peak cars) and air quality improvements before expanding.
- **Public Engagement**: Run awareness campaigns via local media, community meetings, and apps to explain benefits, with trial periods offering free passes.

### Phase 2: Expansion to Full Zone B and Parts of Zone A (Years 2-3)
- **Spread Outward**: After success in Gulshan/Banani, extend to all of Zone B (e.g., Dhanmondi, Karwan Bazar) and initial parts of Zone A (e.g., Motijheel fringes). Add 10-15 more tollgates at zone boundaries.
- **Refined Passes**: Introduce tiered pricing by vehicle type (e.g., cars pay more than CNGs) and time (peak surcharges on day passes). Allow online purchase via mobile apps or kiosks for convenience.
- **Evaluation**: Use data from Phase 1 to adjust fees—e.g., lower for efficient vehicles. Invest early revenue in public buses serving these areas to provide alternatives.

### Phase 3: Citywide Rollout to All Zones (Years 4+)
- **Full Coverage**: Expand to Zone C and complete Zone A, creating a network of 50+ tollgates across Dhaka. Integrate with existing bridges/tunnels for seamless checks.
- **Advanced Options**: While keeping passes core, optionally add tech like electronic tags for faster lanes. Offer bundled passes (e.g., multi-zone yearly) and incentives for low-emission vehicles.
- **Sustainability**: By this stage, aim for 20-30% overall congestion reduction, with revenue funding mass transit like extended MRT lines. Continuous feedback loops via surveys ensure equity and effectiveness.

This stepwise approach starts in manageable, high-impact areas like Gulshan and Banani, allowing authorities to refine the system, build public trust, and scale up without overwhelming infrastructure or residents.

## Implementation Considerations
- **Technology**: Use apps for payment, ANPR cameras at zone boundaries, or vehicle tags on vehicles. Start with pilots in Zone A.
- **Equity**: Offer subsidies for low-income users (e.g., rickshaw pullers, daily wage earners) via digital wallets or exemptions.
- **Benefits**: Reduced congestion (like London's 30% drop), cleaner air, and funds for 1,200 km of new roads per the city's plan.
- **Challenges**: Public acceptance—educate via campaigns showing time savings (e.g., from 2+ hours stuck to under 1 hour).

This system makes roads a shared resource, charged like any service, to build a smoother, fairer Dhaka.