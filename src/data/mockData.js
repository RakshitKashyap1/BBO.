export const mockAdSpaces = [
    {
        id: 'space-1',
        title: 'Times Square Digital Billboard',
        location: 'New York, NY',
        type: 'Digital',
        pricePerDay: 5000,
        minDays: 1,
        image: 'https://images.unsplash.com/photo-1555239962-921cb96f9db1?auto=format&fit=crop&q=80&w=800',
        ownerId: 'owner-1',
        status: 'active',
    },
    {
        id: 'space-2',
        title: 'Highway 101 Static Billboard',
        location: 'San Francisco, CA',
        type: 'Static',
        pricePerDay: 800,
        minDays: 7,
        image: 'https://images.unsplash.com/photo-1542289139-441639c0d4dd?auto=format&fit=crop&q=80&w=800',
        ownerId: 'owner-1',
        status: 'active',
    },
    {
        id: 'space-3',
        title: 'London Underground Panel',
        location: 'London, UK',
        type: 'Print',
        pricePerDay: 1200,
        minDays: 30,
        image: 'https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?auto=format&fit=crop&q=80&w=800',
        ownerId: 'owner-2',
        status: 'active',
    }
];

export const mockUsers = [
    { id: 'adv-1', name: 'Acme Corp', role: 'advertiser', email: 'ads@acme.com' },
    { id: 'owner-1', name: 'Global Media Group', role: 'owner', email: 'sales@globalmedia.com' },
    { id: 'admin-1', name: 'System Admin', role: 'admin', email: 'admin@platform.com' }
];

export const mockBookings = [
    {
        id: 'booking-1',
        spaceId: 'space-1',
        advertiserId: 'adv-1',
        startDate: '2027-04-01',
        endDate: '2027-04-05',
        status: 'approved',
        totalCost: 25000,
    },
    {
        id: 'booking-2',
        spaceId: 'space-2',
        advertiserId: 'adv-1',
        startDate: '2027-05-10',
        endDate: '2027-05-24',
        status: 'pending',
        totalCost: 11200,
    }
];
