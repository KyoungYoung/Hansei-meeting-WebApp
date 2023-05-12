package hanseimeet.meet.controller.user;


import hanseimeet.meet.dto.user.request.UserCreateRequest;
import hanseimeet.meet.dto.user.request.UserUpdateRequest;
import hanseimeet.meet.dto.user.response.UserResponse;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.web.bind.annotation.*;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@RestController
public class UserController {

    private final JdbcTemplate jdbcTemplate;
    public UserController(JdbcTemplate jdbcTemplate){
        this.jdbcTemplate = jdbcTemplate;
    }

    @PostMapping("/user") // POST user
    public void saveUser(@RequestBody UserCreateRequest request) {
        String sql = "INSERT INTO user (name, major, age) VALUES (?,?,?)";
        jdbcTemplate.update(sql, request.getName(), request.getMajor(), request.getAge());

    }

    @GetMapping("/user")
    public List<UserResponse> getUsers() {
        String sql = "SELECT * FROM user";
        return jdbcTemplate.query(sql, new RowMapper<UserResponse>() {
            @Override
            public UserResponse mapRow(ResultSet rs, int rowNum) throws SQLException {
                long id = rs.getLong("id");
                String name = rs.getString("name");
                String major = rs.getString("major");
                int age = rs.getInt("age");
                return new UserResponse(id, name, major, age);
            }
        });
    }

    @PutMapping("/user")
    public void updateUser(@RequestBody UserUpdateRequest request){
        String sql = "UPDATE user SET name = ?  WHERE id = ?";
        jdbcTemplate.update(sql, request.getName(),  request.getId());
    }

    @DeleteMapping("/user")
    public void deleteUser(@RequestParam String name, String major){
        String sql = "DELETE FROM user WHERE name = ? OR major = ?";
        jdbcTemplate.update(sql, name, major);
    }
}
