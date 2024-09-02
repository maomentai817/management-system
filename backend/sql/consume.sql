CREATE TABLE consume (
    memId INT,                      -- 用户ID，外键，关联到 Member 表
    id INT AUTO_INCREMENT,          -- 消费ID，自增，主键
    amount INT NOT NULL,            -- 消费金额
    transactionType BOOLEAN NOT NULL,  -- 消费类型，0支出，1收入
    consumeDate DATE NOT NULL,         -- 消费时间
    recipient VARCHAR(255),         -- 流向，金额消费给谁或如何得到收入
    category VARCHAR(100),          -- 消费类别，具体的消费类别
    isDeleted BOOLEAN DEFAULT 0,    -- 删除标记，是否删除标记，默认为 0（未删除）
    userNote VARCHAR(255),          -- 用户备注
    PRIMARY KEY (id),
    FOREIGN KEY (memId) REFERENCES Member(memId) -- 关联到 Member 表的 memId
);
