const API_URL = 'https://dmtclubapp.com/api';
const handleApiResponse = async (response) => {
    console.log("Raw API Response:", response); // Log the raw response
    const data = await response.json(); // Parse the response as JSON
    console.log('Parsed API Response:', data); // Log the parsed data

    if (!response.ok) {
        console.error('API Error Response:', response.status, data);
        throw new Error(`HTTP ${response.status}: ${data.message || 'Unknown error'}`);
    }
    return data;
};


export const fetchDashboardDetails = async (walletAddress) => {
    try {
        const response = await fetch(`${API_URL}/dashboarddetails`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                wallet_address: walletAddress  // Using 'wallet_address' as the key as expected by the API
            })
        });
        return await handleApiResponse(response);
    } catch (error) {
        console.error('Error fetching dashboard details:', error);
        throw error; 
    }
};
export const fetchUserDetailsByWallet = async (userId) => {
    try {
        const response = await fetch(`${API_URL}/userDetailsbyWallet`, {
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId })
        });
        return await handleApiResponse(response);
    } catch (error) {
        console.error('Error fetching user details:', error);
        throw error;
    }
};

export const fetchUserTeam= async (walletAddress)=>{
    try{
        const response = await fetch(`${API_URL}/get-level-stack-app`
        ,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                walletAddress:walletAddress
            })

        }
    
    );
    return await handleApiResponse(response);
    }
    catch(error){
        console.error('Error fetching user Team', error)
        throw error;
    }
};

export const fetchDirectMember= async (walletAddress)=>{
    try {
        const response = await fetch(`${API_URL}/directmember`,
       {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
            walletAddress:walletAddress
        })
       }
    
    );
    return await handleApiResponse(response);
        
    } catch (error) {
        console.error('Error fetching  direct member',error);
        throw error;
        
    }
};



export const fetchDirectMemberPlace = async (walletAddress) => {
    // Replace this with the actual API call
    const response = await fetch(`${API_URL}/directmemberplace`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ walletAddress })
    });
    return await response.json();
};
