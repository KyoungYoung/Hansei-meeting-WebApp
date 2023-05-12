package hanseimeet.meet.domain.user;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class User {
    private String name;
    private String major;
    private Integer age;

    // 이름이 null이거나 비워있으면 예외 - 저장안됨
    public User(String name, String major, Integer age) {

        if(name == null || name.isBlank()){
            throw new IllegalStateException(String.format("잘못된 name(%s)이 들어왔습니다.", name));
        }
        this.name = name;
        this.major = major;
        this.age = age;
    }


}
