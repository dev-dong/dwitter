// 12345: $2b$12$38ilTtnWFlDgyUkeOaveuuXZsthknaH/rNAAzv.d4LQ1GQtgCmmhG
let users = [
    {
        id: '1',
        username: 'bob',
        password: '$2b$12$38ilTtnWFlDgyUkeOaveuuXZsthknaH/rNAAzv.d4LQ1GQtgCmmhG',
        name: 'Bob',
        email: 'bob@gmail.com',
        url: 'https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png'
    },
    {
        id: '2',
        username: 'dongho',
        password: '$2b$12$38ilTtnWFlDgyUkeOaveuuXZsthknaH/rNAAzv.d4LQ1GQtgCmmhG',
        name: 'Dongho',
        email: 'dho@gmail.com',
        url: 'https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png'
    },
];

export async function findByUsername(username) {
    console.log("Searching for username:", username);  // 확인용 로그
    const user = users.find(user => {
        console.log(user);  // 현재 확인 중인 user 객체를 출력
        return user.username === username;
    });
    console.log("Found user:", user);  // 찾은 user 객체를 출력
    return user;
}

export async function findById(id) {
    return users.find(user => user.id === id);
}

export async function createUser(user) {
    const created = {...user, id: Date.now().toString()};
    users.push(created);
    return created.id;
}
